import { Routes } from '@angular/router';

import { ClienteListComponent }    from './features/clientes/cliente-list/cliente-list.component';
import { ClienteFormComponent }    from './features/clientes/cliente-form/cliente-form.component';
import { EjercicioListComponent }  from './features/ejercicios/ejercicio-list/ejercicio-list.component';
import { EjercicioDetailComponent }from './features/ejercicios/ejercicio-detail/ejercicio-detail.component';
import { CategoriaListComponent } from './features/categorias/buscar-categoria/buscar-categoria.component';
import { CrearCategoriaComponent } from './features/categorias/crear-categoria/crear-categoria.component';
import { InstructorListComponent } from './features/instructores/instructores-list/instructor-list.component';


export const routes: Routes = [
  //NO CAMBIAR EL ORDEN
  { path: 'clientes',        component: ClienteListComponent },
  { path: 'clientes/nuevo',  component: ClienteFormComponent },

  { path: 'ejercicios',            component: EjercicioListComponent },
  { path: 'ejercicios/nuevo',      component: EjercicioDetailComponent },
  { path: 'ejercicios/editar/:id', component: EjercicioDetailComponent },

  { path: 'categorias/listado', component: CategoriaListComponent},
  { path: 'categorias/nuevo', component: CrearCategoriaComponent},

  {path: 'instructores', component: InstructorListComponent},
  

  { path: '', redirectTo: '', pathMatch: 'full' }
];