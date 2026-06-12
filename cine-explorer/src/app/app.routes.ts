import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  // Ruta raíz: muestra HomeComponent cuando la URL es "/"
  { path: '', loadComponent: () => import('./features/home/home').then(m => m.Home) },

  // Ruta con parámetro dinámico: :id se reemplaza por el ID real
  // /movie/550 → MovieDetailComponent con params['id'] = '550'
  {
    path: 'movie/:id',
    // loadComponent: lazy loading — solo carga el código cuando se visita la ruta
    // Mejora el tiempo de carga inicial de la app
    loadComponent: () =>
      import('./features/movie-detail/movie-detail')
        .then(m => m.MovieDetailComponent)
  },

  // Ruta de búsqueda (usa query params: /search?q=batman)
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search-results/search-results')
        .then(m => m.SearchResults)
  },

  // Ruta de favoritos
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites')
        .then(m => m.FavoritesComponent)
  },

  // Ruta wildcard: cualquier URL no definida redirige al inicio
  // DEBE ir al final del array (Angular evalúa en orden)
  { path: '**', redirectTo: '' }
];
