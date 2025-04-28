import { Component } from '@angular/core';
import { MenuOneComponent } from './menu-one/menu-one.component'; // Asegúrate que la ruta sea correcta
import { CommonModule } from '@angular/common'; // NECESARIO para *ngFor

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MenuOneComponent],
  template: `
    <app-menu-one></app-menu-one>
  `,
})
export class AppComponent {}