import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../enviroments/enviroment';

interface LoginResp {
  token: string;
  idUser: number;
  email: string;
  rol: string;
  esAdmin: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.API_URL + 'usuario';

  constructor(private http: HttpClient) {}

  /** Ahora recibe el número de usuario y la contraseña */
  login(idUser: number, password: string) {
    return this.http
      .post<LoginResp>(`${this.base}/login`, { idUser, password })
      .pipe(
        tap(res => {
          localStorage.setItem('jwt_token', res.token);
          localStorage.setItem('user', JSON.stringify({
            id:   res.idUser,
            email: res.email,
            rol:  res.rol,
          }));
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u).rol : null;
  }
}
