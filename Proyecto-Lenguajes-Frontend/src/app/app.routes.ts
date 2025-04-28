import { Routes } from '@angular/router';
import { ClienteListComponent } from './features/clientes/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './features/clientes/cliente-form/cliente-form.component';
import { EjercicioDetailComponent } from './features/ejercicios/ejercicio-detail/ejercicio-detail.component';
import { EjercicioListComponent } from './features/ejercicios/ejercicio-list/ejercicio-list.component';


export const routes: Routes = [
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/nuevo', component: ClienteFormComponent },
  { path: 'ejercicios/crear', component: EjercicioDetailComponent},
  { path: 'ejercicios', component: EjercicioListComponent},
  { path: '**', redirectTo: '' }
];
