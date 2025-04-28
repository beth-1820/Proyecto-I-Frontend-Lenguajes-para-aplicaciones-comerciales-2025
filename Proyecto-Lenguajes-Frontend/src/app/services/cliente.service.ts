// src/app/services/cliente.service.ts
import { Injectable } from '@angular/core';
import { Cliente } from '../domain/cliente.model';
import { environment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ClienteService {
  private url: string = environment.API_URL + 'clientes';

  constructor(private http: HttpClient) {}

  /** GET todos los clientes */
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  /** GET cliente por ID */
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  /** POST nuevo cliente */
  crearCliente(c: Cliente): Observable<void> {
    return this.http.post<void>(this.url, c);
  }

  /** PUT actualizar */
  actualizarCliente(c: Cliente): Observable<void> {
    return this.http.put<void>(`${this.url}/${c.idCliente}`, c);
  }
  

  /** DELETE */
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
