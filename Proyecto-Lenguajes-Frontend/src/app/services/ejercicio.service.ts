import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejercicio } from '../domain/ejercicio.model';
import { Categoria } from '../domain/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  private apiUrl = 'http://localhost:8080/api/ejercicios';

  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }

  // Crear un nuevo ejercicio
  crearEjercicio(ejercicio: Ejercicio): Observable<any> {
    return this.http.post(`${this.apiUrl}`, ejercicio);
  }
}
