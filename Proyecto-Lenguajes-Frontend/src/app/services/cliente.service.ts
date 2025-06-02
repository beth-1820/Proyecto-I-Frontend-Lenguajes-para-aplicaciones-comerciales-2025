import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

import { Cliente } from '../domain/cliente.model';
import { ClienteMedidaValor } from '../domain/clienteMedidaValor';

@Injectable({
  providedIn: 'root' 
})
export class ClienteService {
  private url: string = environment.API_URL + 'clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  crearCliente(c: Cliente): Observable<void> {
    return this.http.post<void>(this.url, c);
  }

  actualizarCliente(c: Cliente): Observable<void> {
    return this.http.put<void>(`${this.url}/${c.idCliente}`, c);
  }

  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getMedidas(idCliente: number): Observable<ClienteMedidaValor[]> {
    return this.http.get<ClienteMedidaValor[]>(`${this.url}/${idCliente}/medidas`);
  }

  updateMedidas(idCliente: number, valores: ClienteMedidaValor[]): Observable<void> {
    return this.http.post<void>(`${this.url}/${idCliente}/medidas`, valores);
  }

  // NUEVO: búsqueda por nombre
  buscarPorNombre(nombre: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/buscar?nombre=${nombre}`);
  }
}
