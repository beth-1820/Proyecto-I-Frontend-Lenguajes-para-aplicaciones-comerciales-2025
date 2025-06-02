import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import { Rutina } from '../domain/rutina.model';
import { Cliente } from '../domain/cliente.model';
import { Instructor } from '../domain/instructor.model';
import { ItemRutinaEjercicio } from '../domain/itemRutinaEjercicio.model';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  private rutinaUrl = environment.API_URL + 'rutinas';
  private clienteUrl = environment.API_URL + 'clientes';
  private instructorUrl = environment.API_URL + 'instructores';
  private itemUrl = environment.API_URL + 'item-rutina-ejercicio';

  constructor(private http: HttpClient) {}

  // Rutina
  crearRutina(rutina: Rutina): Observable<number> {
    // Retorna el id creado, según el backend
    return this.http.post<number>(this.rutinaUrl, rutina);
  }

  obtenerRutinaPorId(id: number): Observable<Rutina> {
    return this.http.get<Rutina>(`${this.rutinaUrl}/${id}`);
  }

  actualizarRutina(id: number, rutina: Rutina): Observable<void> {
    return this.http.put<void>(`${this.rutinaUrl}/${id}`, rutina);
  }

  obtenerRutinas(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(this.rutinaUrl);
  }

  // Clientes
  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clienteUrl);
  }

  // Instructores
  obtenerInstructores(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.instructorUrl);
  }

  // Items Rutina Ejercicio
  obtenerEjerciciosPorRutina(codRutina: number): Observable<ItemRutinaEjercicio[]> {
    return this.http.get<ItemRutinaEjercicio[]>(`${this.itemUrl}/rutina/${codRutina}`);
  }

  actualizarItemEjercicio(id: number, item: ItemRutinaEjercicio): Observable<void> {
    return this.http.put<void>(`${this.itemUrl}/${id}`, item);
  }

  agregarItemEjercicio(item: ItemRutinaEjercicio): Observable<void> {
    return this.http.post<void>(this.itemUrl, item);
  }

  eliminarItemEjercicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.itemUrl}/${id}`);
  }
}
