// app.config.ts
// Configuración global de la aplicación
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// provideHttpClient habilita HttpClient en toda la app
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { apiKeyInterceptor } from './core/interceptor/api-key';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    // Habilitar el sistema de rutas
    provideRouter(routes),
    // Habilitar HttpClient para hacer peticiones HTTP
    provideHttpClient(withFetch(), withInterceptors([apiKeyInterceptor]))
  ]
};
