// src/app/services/reporte.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

import { Cliente } from '../domain/cliente.model';
import { Rutina } from '../domain/rutina.model';
import { ItemRutinaEjercicio } from '../domain/itemRutinaEjercicio.model';
import { Instructor } from '../domain/instructor.model';
import { ReporteRutinaDTO } from '../domain/reporteRutina.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private clienteUrl    = environment.API_URL + 'clientes';
  private rutinaUrl     = environment.API_URL + 'rutinas';
  private itemUrl       = environment.API_URL + 'item-rutina-ejercicio';
  private instructorUrl = environment.API_URL + 'instructores';
  private reporteUrl    = environment.API_URL + 'reportes'; // <— NUEVO

  constructor(private http: HttpClient) {}

  // --- Clientes ---
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clienteUrl);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.clienteUrl}/${id}`);
  }

  // --- Rutinas ---
  getRutinas(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(this.rutinaUrl);
  }

  getRutina(id: number): Observable<Rutina> {
    return this.http.get<Rutina>(`${this.rutinaUrl}/${id}`);
  }

  // --- Ítems de Rutina ---
  getItems(codRutina: number): Observable<ItemRutinaEjercicio[]> {
    return this.http.get<ItemRutinaEjercicio[]>(`${this.itemUrl}/rutina/${codRutina}`);
  }

  // --- Instructores ---
  obtenerInstructores(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.instructorUrl);
  }

  // --- NUEVO: Reporte de Rutina por Cliente ---
  obtenerReportePorCliente(idCliente: number): Observable<ReporteRutinaDTO> {
    return this.http.get<ReporteRutinaDTO>(
      `${this.reporteUrl}/cliente/${idCliente}`
    );
  }
}
