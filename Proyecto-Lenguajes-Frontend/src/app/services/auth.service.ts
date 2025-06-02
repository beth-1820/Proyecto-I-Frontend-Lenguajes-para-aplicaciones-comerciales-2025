// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../enviroments/enviroment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(idUser: number, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}usuario/login`, { idUser, password }).pipe(
      tap((response: any) => {
        // Guardar token y datos de usuario
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          idUser: response.idUser,
          email: response.email,
          rol: response.rol
        }));

        // Redirigir según el rol
        if (response.esAdmin) {
          this.router.navigate(['/home']);
        } else if (response.esInstructor) {
          this.router.navigate(['/menu-instructores']);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).rol : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}