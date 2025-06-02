import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ← Importa esto

import { Rutina } from '../../../domain/rutina.model';
import { RutinaService } from '../../../services/rutina.service';

@Component({
  selector: 'app-mostrar-rutinas',
  standalone: true,
  imports: [CommonModule, RouterModule], // ← Agrégalo aquí
  templateUrl: './mostrar-rutinas.component.html',
  styleUrls: ['./mostrar-rutinas.component.css'],
})
export class MostrarRutinasComponent implements OnInit {
  rutinas: Rutina[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private rutinaService: RutinaService) {}

  ngOnInit(): void {
    this.obtenerRutinas();
  }

  obtenerRutinas(): void {
    this.rutinaService.obtenerRutinas().subscribe({
      next: (data: Rutina[]) => {
        this.rutinas = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar las rutinas';
        this.loading = false;
      }
    });
  }
}
