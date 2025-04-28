import { Injectable } from '@angular/core';
import { MenuNavigation } from '../domain/menunavegation';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

private menu: MenuNavigation[]= [

  {
    title: 'Catálogo de categorías',
    icon: '',
    url: 'categorias',
    subItems: [
      {
        title:'Buscar Categoría',
        url:'categorias/listado',
      },
      {
        title:'Crear Categoría',
        url:'categorias/nuevo',
      }
    ]

  },
  {
    title: 'Catálogo de Ejercicios',
    icon: '',
    url: 'ejercicio',
    subItems: [
      {
        title:'Buscar Ejercicio',
        url:'ejercicios',
      },
      {
        title:'Crear Ejercicio',
        url:'ejercicios/nuevo',
      }

    ]

  },
  {
    title: 'Instructores',
    icon: '',
    url: 'instructores',
    subItems: [
      {
        title:'Buscar Instructor',
        url:'buscarInstructor/ver',
      },
      {
        title:'Lista Instructores',
        url:'ListadoInstructores/ver',
      }
    ]

  },
  {
    title: 'Clientes',
    icon: '',
    url: 'clientes',
    subItems: [
      {
        title: 'Buscar Cliente',
        url: 'clientes',   // si "buscar" también es el listado general
      },
      {
        title: 'Añadir Cliente',
        url: 'clientes/nuevo',  // formulario para crear cliente
      },
    ]
  } 
]

  getMenu():MenuNavigation[]{
    return this.menu



  }

}

