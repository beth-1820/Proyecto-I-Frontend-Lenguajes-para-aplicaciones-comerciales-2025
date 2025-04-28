import { Routes } from '@angular/router';
import { ClienteListComponent } from './features/clientes/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './features/clientes/cliente-form/cliente-form.component';
import { CategoriaListComponent } from './features/categorias/buscar-categoria/buscar-categoria.component';
import { CrearCategoriaComponent } from './features/categorias/crear-categoria/crear-categoria.component';

export const routes: Routes = [
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/nuevo', component: ClienteFormComponent },
  { path: 'categorias/listado', component: CategoriaListComponent},
  { path: 'categorias/nuevo', component: CrearCategoriaComponent},
  { path: '**', redirectTo: 'categorias' }
];
