// src/app/features/reporte/generar-reporte/generar-reporte.component.ts
import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../../services/reporte.service';
import { Cliente } from '../../../domain/cliente.model';
import { Rutina } from '../../../domain/rutina.model';
import { ItemRutinaEjercicio } from '../../../domain/itemRutinaEjercicio.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// src/app/features/reporte/generar-reporte/generar-reporte.component.ts

@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class GenerarReporteComponent implements OnInit {

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    
  }

}