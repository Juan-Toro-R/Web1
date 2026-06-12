import { Component, input, output } from '@angular/core';
import { Movie } from '../../../core/models/movie';
import { RouterLink } from '@angular/router';

import { TruncatePipe } from '../../pipes/truncate-pipe';
import { TmdbImagePipe } from '../../pipes/tmdb-image';
import { StarsPipe } from '../../pipes/stars';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink, TruncatePipe, TmdbImagePipe, StarsPipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  movie = input.required<Movie>();
  esFavorita = input<boolean>(false);
  toggleFavorito = output<Movie>();

  onToggleFavorito(): void {
    this.toggleFavorito.emit(this.movie());
  }
}
