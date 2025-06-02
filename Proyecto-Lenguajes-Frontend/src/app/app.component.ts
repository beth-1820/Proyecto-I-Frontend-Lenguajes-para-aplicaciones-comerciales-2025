// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { ShareModule } from './shared/share/share.module';
import { MenuInstructoresComponent } from './menu-instructores/menu-instructores.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ShareModule, MenuInstructoresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  shouldShowHeader(): boolean {
    return this.auth.isLoggedIn() && this.auth.getUserRole() === 'admin';
  }

  shouldShowInstructorMenu(): boolean {
    return this.auth.isLoggedIn() && this.auth.getUserRole() === 'instructor';
  }

  title = 'Proyecto-Lenguajes-Frontend';
}