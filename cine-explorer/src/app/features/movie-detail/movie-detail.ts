import { Component,OnInit, inject, ChangeDetectorRef } from '@angular/core';
// ActivatedRoute da acceso a los parámetros de la ruta actual
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tmdb } from '../../core/services/tmdb';
import { Favorites } from '../../core/services/favorites';
import { MovieDetail, Credits } from '../../core/models/movie';
import { UpperCasePipe } from '@angular/common';
import { ReviewForm } from './review-form/review-form';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, ReviewForm],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(Tmdb);
  private favoritesService = inject(Favorites);
  private cdr = inject(ChangeDetectorRef);

  // Estado del componente
  pelicula: MovieDetail | null = null;  // null mientras carga
  creditos: Credits | null = null;
  cargando: boolean = true;
  error: string = '';

  ngOnInit(): void {
    // Leer el parámetro :id de la URL
    const id = +this.route.snapshot.params['id'];
    this.cargarPelicula(id);
    this.cargarCreditos(id);
  }

  // Cargar detalle de la película
  cargarPelicula(id: number): void {
    this.tmdbService.obtenerDetalle(id).subscribe({
      next: (data) => {
        this.pelicula = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudo cargar la película';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  // Cargar créditos (reparto)
  cargarCreditos(id: number): void {
    this.tmdbService.obtenerCreditos(id).subscribe({
      next: (data) => {
        this.creditos = data;
        this.cdr.markForCheck();
      }
    });
  }

  // Verificar si es favorita
  get esFavorita(): boolean {
    return this.pelicula ? this.favoritesService.esFavorita(this.pelicula.id) : false;
  }

  // Alternar favorito
  toggleFavorito(): void {
    if (this.pelicula) {
      this.favoritesService.toggle(this.pelicula);
    }
  }
}
