// src/app/features/reporte/generar-reporte/generar-reporte.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ReporteService } from '../../../services/reporte.service';
import { Cliente } from '../../../domain/cliente.model';
import { ReporteRutinaDTO } from '../../../domain/reporteRutina.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-generar-reporte',
  standalone: true,
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class GenerarReporteComponent implements OnInit {
  clientes: Cliente[] = [];
  selectedClienteId?: number;
  reporte?: ReporteRutinaDTO;
  cargando = false;
  errorMensaje = '';

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.reporteService.getClientes().subscribe({
      next: (lista) => {
        this.clientes = lista;
      },
      error: (err) => {
        this.errorMensaje = 'No se pudo cargar la lista de clientes.';
        console.error(err);
      }
    });
  }

  onClienteChange(): void {
    if (!this.selectedClienteId) {
      this.reporte = undefined;
      this.errorMensaje = '';
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';
    this.reporte = undefined;

    this.reporteService.obtenerReportePorCliente(this.selectedClienteId).subscribe({
      next: (dto) => {
        this.reporte = dto;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'No se encontró una rutina para el cliente seleccionado.';
        console.error(err);
        this.cargando = false;
      }
    });
  }

  imprimirReporte(): void {
    window.print();
  }
}
