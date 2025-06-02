import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuInstructoresService } from '../menu-instructores.service';

@Component({
  selector: 'app-menu-instructores',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-instructores.component.html',
  styleUrls: ['./menu-instructores.component.css']
})
export class MenuInstructoresComponent {
  menuItems: any[];
  activeDropdown: string | null = null;

  constructor(private menuService: MenuInstructoresService) {
    this.menuItems = this.menuService.getMenuItems();
  }

  toggleDropdown(label: string, event: Event): void {
    event.preventDefault();
    this.activeDropdown = this.activeDropdown === label ? null : label;
  }

  closeDropdowns(): void {
    this.activeDropdown = null;
  }
}