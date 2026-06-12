import { Component, inject } from '@angular/core';
import { Favorites } from '../../core/services/favorites';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class FavoritesComponent {
  private favoritesService = inject(Favorites);

  // Obtener las películas favoritas del servicio
  get favoritas(): Movie[] {
    return this.favoritesService.obtenerTodas();
  }

  // Quitar de favoritos
  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}
