// Servicio que maneja el tema visual (claro/oscuro) con persistencia
import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { StorageService } from './storage';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storage = inject(StorageService);
  private platformId = inject(PLATFORM_ID);
  private readonly KEY = 'cine-explorer-tema';

  // Tema actual (se inicializa en el constructor)
  private temaActual: string;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.temaActual = this.obtenerTemaInicial();
      this.aplicarTema(this.temaActual);
    } else {
      this.temaActual = 'light';
    }
  }

  // Retorna el tema actual
  obtenerTema(): string {
    return this.temaActual;
  }

  // Cambia el tema y lo persiste
  cambiarTema(tema: string): void {
    this.temaActual = tema;
    this.aplicarTema(tema);
    // Guardar en localStorage para que persista al recargar
    this.storage.set(this.KEY, tema);
  }

  // Alterna entre light y dark
  toggle(): void {
    const nuevoTema = this.temaActual === 'light' ? 'dark' : 'light';
    this.cambiarTema(nuevoTema);
  }

  // Determina el tema inicial
  private obtenerTemaInicial(): string {
    // 1. Verificar si hay tema guardado en localStorage
    const guardado = this.storage.get<string | null>(this.KEY, null);
    if (guardado) return guardado;

    // 2. Si no hay guardado, respetar la preferencia del sistema operativo
    // window.matchMedia detecta si el usuario tiene tema oscuro en su SO
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // 3. Por defecto: tema claro
    return 'light';
  }

  // Aplica el tema al elemento <html> del DOM
  private aplicarTema(tema: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // setAttribute agrega data-theme="dark" o data-theme="light" al <html>
    // Los estilos CSS usan este atributo para cambiar colores
    document.documentElement.setAttribute('data-theme', tema);
  }
}
