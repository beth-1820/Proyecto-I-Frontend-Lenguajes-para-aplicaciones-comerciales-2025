import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE
import { ShareModule } from './shared/share/share.module';
import { MenuInstructoresComponent } from './menu-instructores/menu-instructores.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ShareModule, MenuInstructoresComponent], // 👈 AGREGA CommonModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}

  shouldShowInstructorMenu(): boolean {
    const currentRoute = this.router.url;
    const hiddenRoutes = [
      '/clientes',
      '/clientes/nuevo',
      '/ejercicios',
      '/ejercicios/nuevo',
      '/ejercicios/editar',
      '/categorias/listado',
      '/categorias/nuevo',
      '/instructores',
      '/home',
      '/menu-instructores'
    ];
    return !hiddenRoutes.some(route => currentRoute.startsWith(route));
  }

  title = 'Proyecto-Lenguajes-Frontend';
}
