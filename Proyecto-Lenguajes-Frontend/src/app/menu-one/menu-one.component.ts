import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-one',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-one.component.html',
  styleUrls: ['./menu-one.component.css']
})
export class MenuOneComponent {
  menuItems = [
    {
      title: 'Catálogo de medidas',
      subItems: [
        { label: 'Ver medidas', route: '/medidas/ver' },
        { label: 'Agregar medidas', route: '/medidas/agregar' }
      ]
    },
    {
      title: 'Catálogo de ejercicios',
      subItems: [
        { label: 'Buscar ejercicio', route: '/ejercicios/buscar' },
        { label: 'Agregar ejercicio', route: '/ejercicios/agregar' }
      ]
    },
    {
      title: 'Instructores',
      subItems: [
        { label: 'Buscar instructor', route: '/instructores/buscar' },
        { label: 'Lista de instructores', route: '/instructores/lista' }
      ]
    },
    {
      title: 'Clientes',
      subItems: [
        { label: 'Buscar cliente', route: '/clientes/buscar' },
        { label: 'Agregar cliente', route: '/clientes/agregar' }
      ]
    }
  ];

  activeMenu: number | null = null;

  toggleMenu(index: number): void {
    this.activeMenu = this.activeMenu === index ? null : index;
  }
}