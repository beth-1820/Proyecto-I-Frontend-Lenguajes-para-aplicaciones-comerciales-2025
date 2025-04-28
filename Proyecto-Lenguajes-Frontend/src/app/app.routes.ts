import { Routes } from '@angular/router';
import { ClienteListComponent } from './features/clientes/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './features/clientes/cliente-form/cliente-form.component';

export const routes: Routes = [
  /* listado principal */
  { path: 'clientes',        component: ClienteListComponent },

  /* formulario para crear nuevo cliente */
  { path: 'clientes/nuevo',  component: ClienteFormComponent },

  /* HOME → redirige a la lista */
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },

  /* Wildcard (404) */
  { path: '**', redirectTo: 'clientes' }
];
