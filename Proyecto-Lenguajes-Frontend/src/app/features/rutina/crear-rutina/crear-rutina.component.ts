import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Rutina } from '../../../domain/rutina.model';
import { ItemRutinaEjercicio } from '../../../domain/itemRutinaEjercicio.model';
import { Cliente } from '../../../domain/cliente.model';
import { Instructor } from '../../../domain/instructor.model';


import { RutinaService } from '../../../services/rutina.service';

@Component({
  selector: 'app-crear-rutina',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-rutina.component.html',
  styleUrls: ['./crear-rutina.component.css']
})
export class CrearRutinaComponent implements OnInit {
  rutina: Rutina = new Rutina();
  ejercicios: ItemRutinaEjercicio[] = [];
  nuevoEjercicio: ItemRutinaEjercicio = new ItemRutinaEjercicio();

  clientes: Cliente[] = [];
  instructores: Instructor[] = [];

  mensaje = '';
  error = '';

  constructor(private rutinaService: RutinaService) {}

  ngOnInit(): void {
    this.rutina.fechaCreacion = new Date();
    this.rutina.fechaRenovacion = new Date();

    this.rutinaService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
    });

    this.rutinaService.obtenerInstructores().subscribe(instructores => {
      this.instructores = instructores;
    });
  }

  agregarEjercicio() {
    if (this.nuevoEjercicio.codEjercicio && this.nuevoEjercicio.seriesEjercicio && this.nuevoEjercicio.repeticionesEjercicio) {
      this.ejercicios.push({ ...this.nuevoEjercicio });
      this.nuevoEjercicio = new ItemRutinaEjercicio();
    } else {
      this.error = 'Debe completar todos los campos del ejercicio con valores válidos.';
    }
  }

  eliminarEjercicio(index: number) {
    this.ejercicios.splice(index, 1);
  }

  guardarRutina() {
    this.mensaje = '';
    this.error = '';

    if (!this.rutina.cliente || !this.rutina.instructor) {
      this.error = 'Debe seleccionar un cliente e instructor.';
      return;
    }

    if (this.ejercicios.length === 0) {
      this.error = 'Debe agregar al menos un ejercicio.';
      return;
    }

    // Asociar ejercicios directamente a la rutina
    this.rutina.ejercicios = this.ejercicios;

    this.rutinaService.crearRutina(this.rutina).subscribe({
      next: () => {
        this.mensaje = 'Rutina y ejercicios creados exitosamente';
        this.resetearFormulario();
      },
      error: err => {
        this.error = 'Error al guardar la rutina: ' + err.message;
      }
    });
  }

  resetearFormulario() {
    this.rutina = new Rutina({
      fechaCreacion: new Date(),
      fechaRenovacion: new Date()
    });
    this.ejercicios = [];
    this.nuevoEjercicio = new ItemRutinaEjercicio();
  }
}
