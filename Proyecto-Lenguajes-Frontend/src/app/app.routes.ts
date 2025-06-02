// src/app/app.routes.ts
import { Routes }                                  from '@angular/router';

import { LoginComponent }                          from './features/auth/login/login.component';
import { AuthGuard }                               from './guards/auth.guard';

import { ClienteListComponent }                    from './features/clientes/cliente-list/cliente-list.component';
import { ClienteFormComponent }                    from './features/clientes/cliente-form/cliente-form.component';
import { EjercicioListComponent }                  from './features/ejercicios/ejercicio-list/ejercicio-list.component';
import { EjercicioDetailComponent }                from './features/ejercicios/ejercicio-detail/ejercicio-detail.component';
import { CategoriaListComponent }                  from './features/categorias/buscar-categoria/buscar-categoria.component';
import { CrearCategoriaComponent }                 from './features/categorias/crear-categoria/crear-categoria.component';
import { InstructorListComponent }                 from './features/instructores/instructores-list/instructor-list.component';
import { InfoGimnasioComponent } from './features/info-gimnasio/info-gimnasio.component';
import { CrearRutinaComponent  } from './features/rutina/crear-rutina/crear-rutina.component';

import { HomeComponent } from './features/home/home.component';
import { MenuInstructoresComponent } from './features/menu-instructores/menu-instructores.component';
export const routes: Routes = [
  // 1) Login (público)
  { path: 'login', component: LoginComponent },

  // 2) Rutas protegidas por AuthGuard
  { path: 'clientes',        component: ClienteListComponent, canActivate: [AuthGuard] },
  { path: 'clientes/nuevo',  component: ClienteFormComponent, canActivate: [AuthGuard] },

  { path: 'ejercicios',            component: EjercicioListComponent,   canActivate: [AuthGuard] },
  { path: 'ejercicios/nuevo',      component: EjercicioDetailComponent, canActivate: [AuthGuard] },
  { path: 'ejercicios/editar/:id', component: EjercicioDetailComponent, canActivate: [AuthGuard] },

  { path: 'categorias/listado',    component: CategoriaListComponent,   canActivate: [AuthGuard] },
  { path: 'categorias/nuevo',      component: CrearCategoriaComponent,  canActivate: [AuthGuard] },

  { path: 'instructores',          component: InstructorListComponent,  canActivate: [AuthGuard] },
  { path: 'rutinas',               component: CrearRutinaComponent,  canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },

  { path: 'info-gimnasio', component: InfoGimnasioComponent, canActivate: [AuthGuard] },

  { path: 'menu-instructores', component: MenuInstructoresComponent },


  // 3) Redirects por defecto
  { path: '',     redirectTo: 'login', pathMatch: 'full' },
  { path: '**',   redirectTo: 'login', pathMatch: 'full' }
];
