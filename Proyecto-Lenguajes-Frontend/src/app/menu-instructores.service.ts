import { Injectable } from '@angular/core';

export interface MenuItem {
  label: string;
  route: string;
  subItems?: SubMenuItem[];
}

export interface SubMenuItem {
  label: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuInstructoresService {
  getMenuItems(): MenuItem[] {
    return [
      { 
        label: 'Ejercicios', 
        route: '/ejercicios',
        subItems: [
          { label: 'Crear ejercicio', route: '/ejercicios/crear' },
          { label: 'Lista de ejercicios', route: '/ejercicios/lista' }
        ]
      },
      { 
        label: 'Categorías', 
        route: '/categorias',
        subItems: [
          { label: 'Nueva categoría', route: '/categorias/nueva' },
          { label: 'Ver categorías', route: '/categorias/lista' }
        ]
      },
      { 
        label: 'Rutinas', 
        route: '/rutinas',
        subItems: [
          { label: 'Crear rutina', route: '/rutinas/crear' },
          { label: 'Mis rutinas', route: '/rutinas/lista' }
        ]
      },
      { 
        label: 'Clientes', 
        route: '/clientes',
        subItems: [
          { label: 'Registrar cliente', route: '/clientes/registrar' },
          { label: 'Lista de clientes', route: '/clientes/lista' }
        ]
      },
      { 
        label: 'Reportes', 
        route: '/reportes',
        subItems: [
          { label: 'Generar reporte', route: '/reportes/generar' },
          { label: 'Reportes anteriores', route: '/reportes/historial' }
        ]
      }
    ];
  }
}