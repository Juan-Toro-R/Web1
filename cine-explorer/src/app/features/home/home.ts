import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { Favorites } from '../../core/services/favorites';
import { Movie } from '../../core/models/movie';
import { Tmdb } from '../../core/services/tmdb';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  // Inyectar los servicios
  private tmdbService = inject(Tmdb);
  private favoritesService = inject(Favorites);
  private cdr = inject(ChangeDetectorRef);
  // Estado del componente
  peliculas: Movie[] = [];     // lista de películas cargadas
  cargando: boolean = true;    // indicador de carga
  error: string = '';          // mensaje de error (vacío = sin error)

  // ngOnInit se ejecuta al crear el componente — ideal para cargar datos
  ngOnInit(): void {
    this.cargarPeliculas();
  }

  // Cargar películas populares de la API
  cargarPeliculas(): void {
    this.cargando = true;   // mostrar spinner
    this.error = '';        // limpiar error anterior

    // subscribe() se suscribe al Observable que retorna el servicio
    // next: se ejecuta cuando llegan los datos
    // error: se ejecuta si la petición falla
    this.tmdbService.obtenerPopulares().subscribe({
      next: (response) => {
        // response es de tipo MovieResponse (tipado automático)
        this.peliculas = response.results;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar películas:', err);
        this.error = 'No se pudieron cargar las películas. Verifica tu conexión.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  esFavorita(id: number): boolean {
    return this.favoritesService.esFavorita(id);
  }

  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}
