import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShareModule } from './shared/share/share.module';
import { MenuInstructoresComponent } from './menu-instructores/menu-instructores.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShareModule, MenuInstructoresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
constructor(private router: Router) {}

  shouldShowInstructorMenu(): boolean {
    const currentRoute = this.router.url;
    
    // Rutas donde NO debe mostrarse el menú de instructores
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
    
    // Verifica si la ruta actual comienza con alguna de las rutas ocultas
    return !hiddenRoutes.some(route => currentRoute.startsWith(route));
  }





  title = 'Proyecto-Lenguajes-Frontend';
}


