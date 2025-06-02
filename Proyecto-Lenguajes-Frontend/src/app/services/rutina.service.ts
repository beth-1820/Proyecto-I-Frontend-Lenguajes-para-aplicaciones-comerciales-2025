import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import { Rutina } from '../domain/rutina.model';
import { Cliente } from '../domain/cliente.model';
import { Instructor } from '../domain/instructor.model';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  private rutinaUrl = environment.API_URL + 'rutinas';
  private clienteUrl = environment.API_URL + 'clientes';
  private instructorUrl = environment.API_URL + 'instructores';

  constructor(private http: HttpClient) {}

  crearRutina(rutina: Rutina): Observable<void> {
    return this.http.post<void>(this.rutinaUrl, rutina);
  }

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clienteUrl);
  }

  obtenerInstructores(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.instructorUrl);
  }
}
