// card-layout.component.ts
import { Component } from "@angular/core";

// Componente contenedor reutilizable con slots para contenido
@Component({
  selector: 'app-card-layout',
  standalone: true,
  template: `
    <!-- ng-content con select filtra qué contenido va en cada slot -->
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <!-- Solo el contenido con atributo "card-header" va aquí -->
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="card-body">
        <!-- El contenido sin selector va aquí (slot por defecto) -->
        <ng-content></ng-content>
      </div>
      <div class="card-footer">
        <!-- Solo el contenido con atributo "card-footer" va aquí -->
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `
})
export class CardLayoutComponent {}
