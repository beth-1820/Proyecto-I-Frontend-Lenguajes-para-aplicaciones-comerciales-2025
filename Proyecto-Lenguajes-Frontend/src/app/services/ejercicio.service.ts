// src/app/services/ejercicio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../enviroments/enviroment';
import { Ejercicio }  from '../domain/ejercicio.model';
import { Categoria }  from '../domain/categoria.model';
import { Equipamiento } from '../domain/equipamiento.model';

@Injectable({ providedIn: 'root' })
export class EjercicioService {
  private base = environment.API_URL + 'ejercicios';

  constructor(private http: HttpClient) {}

  /** CRUD SOBRE EJERCICIOS */
  getEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(`${this.base}/listar`);
  }
  getEjercicio(id: number): Observable<Ejercicio> {
    return this.http.get<Ejercicio>(`${this.base}/editar/${id}`);
  }
  crearEjercicio(e: Ejercicio): Observable<any> {
    return this.http.post(`${this.base}`, e);
  }
  actualizarEjercicio(id: number, e: Ejercicio): Observable<any> {
    return this.http.put(
      `${this.base}/editar/${id}`,
      e,
      { responseType: 'text' as 'json' }
    );
  }
  eliminarEjercicio(id: number): Observable<any> {
    return this.http.delete(`${this.base}/listar/${id}`);
  }

  /** CATÁLOGOS */
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.base}/categorias`);
  }
  getEquipos(): Observable<Equipamiento[]> {
    return this.http.get<Equipamiento[]>(`${this.base}/editar/equipos`);
  }
}
