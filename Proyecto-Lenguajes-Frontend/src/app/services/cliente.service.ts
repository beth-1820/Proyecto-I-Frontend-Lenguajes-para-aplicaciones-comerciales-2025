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

  /** PUT actualizar cliente */
  actualizarCliente(c: Cliente): Observable<void> {
    return this.http.put<void>(`${this.url}/${c.idCliente}`, c);
  }

  /** DELETE cliente */
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  /** GET medidas de un cliente */
  getMedidas(idCliente: number): Observable<ClienteMedidaValor[]> {
    return this.http.get<ClienteMedidaValor[]>(
      `${this.url}/${idCliente}/medidas`
    );
  }

  /** POST guarda/actualiza medidas de un cliente */
  updateMedidas(
    idCliente: number,
    valores: ClienteMedidaValor[]
  ): Observable<void> {
    return this.http.post<void>(
      `${this.url}/${idCliente}/medidas`,
      valores
    );
  }
}
