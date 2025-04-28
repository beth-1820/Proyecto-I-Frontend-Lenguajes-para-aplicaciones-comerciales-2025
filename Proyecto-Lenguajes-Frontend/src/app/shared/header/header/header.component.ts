import { Component, OnInit } from '@angular/core';
import { MenuNavigation } from '../../../domain/menunavegation';
import { MenuService } from '../../../services/menu.service';

@Component({
  standalone:false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  menu: MenuNavigation[] = []
  selectedMenu: MenuNavigation | null = null;
  constructor(private menuService:MenuService){
    
  }

  ngOnInit(): void {
    this.menu = this.menuService.getMenu()
    console.log(this.menu)
  }

  selectMenu(item: MenuNavigation) {
    this.selectedMenu = item;
  }

  closeMenu() {
    this.selectedMenu = null;
  }
}
