// src/app/services/reporte.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

import { Cliente } from '../domain/cliente.model';
import { Rutina } from '../domain/rutina.model';
import { ItemRutinaEjercicio } from '../domain/itemRutinaEjercicio.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private clienteUrl = `${environment.API_URL}clientes`;
  private rutinaUrl  = `${environment.API_URL}rutinas`;
  private itemUrl    = `${environment.API_URL}item-rutina-ejercicio`;

  constructor(private http: HttpClient) {}

  // Clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clienteUrl);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.clienteUrl}/${id}`);
  }

  // Rutinas
  getRutinas(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(this.rutinaUrl);
  }

  getRutina(id: number): Observable<Rutina> {
    return this.http.get<Rutina>(`${this.rutinaUrl}/${id}`);
  }

  // Ítems de Rutina
  getItems(codRutina: number): Observable<ItemRutinaEjercicio[]> {
    return this.http.get<ItemRutinaEjercicio[]>(`${this.itemUrl}/rutina/${codRutina}`);
  }
}
