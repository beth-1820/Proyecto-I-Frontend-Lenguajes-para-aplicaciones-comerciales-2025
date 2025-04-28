import { Injectable } from '@angular/core';
import { Ejercicio } from '../domain/ejercicio.model';
import { environment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  private url: string = environment.API_URL + 'ejercicios';

  constructor(private http: HttpClient) {}

  /** GET todos los ejercicios */
  getEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(this.url);
  }

  /** GET ejercicio por ID */
  getEjercicio(id: number): Observable<Ejercicio> {
    return this.http.get<Ejercicio>(`${this.url}/${id}`);
  }

  /** POST nuevo ejercicio */
  crearEjercicio(e: Ejercicio): Observable<void> {
    return this.http.post<void>(this.url, e);
  }

  /** PUT actualizar ejercicio */
  actualizarEjercicio(e: Ejercicio): Observable<void> {
    return this.http.put<void>(`${this.url}/${e.codEjercicio}`, e);
  }

  /** DELETE eliminar ejercicio */
  eliminarEjercicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
