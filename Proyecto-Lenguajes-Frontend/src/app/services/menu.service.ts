import { Injectable } from '@angular/core';
import { MenuNavigation } from '../domain/menunavegation';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

private menu: MenuNavigation[]= [

  {
    title: 'Quienes somos',
    icon: '',
    url: 'home',
    subItems: [
      {
        title:'Acerca de nosotros',
        url:'home',
      },
    ]

  },
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
        url:'instructores',
      },
    ]

  },
  {
    title: 'Clientes',
    icon: '',
    url: 'clientes',
    subItems: [
      {
        title: 'Buscar Cliente',
        url: 'clientes',   
      },
      {
        title: 'Añadir Cliente',
        url: 'clientes/nuevo',  
      },
    ]
  },
  {
    title: 'Perfil',
    icon: '',
    url: 'login',
    subItems: [
      {
      title: 'Cerrar sesión',
      url: 'login',
      }
    ]

  }
]

  getMenu():MenuNavigation[]{
    return this.menu



  }

}

