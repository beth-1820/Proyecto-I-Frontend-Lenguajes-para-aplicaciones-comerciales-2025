import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Ejercicio } from '../../../domain/ejercicio.model'; // <- tu modelo de Ejercicio
import { EjercicioService } from '../../../services/ejercicio.service'; // <- tu servicio de Ejercicio

@Component({
  standalone: true,
  selector: 'app-ejercicio-detail',
  templateUrl: './ejercicio-detail.component.html',
  styleUrls: ['./ejercicio-detail.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EjercicioDetailComponent {

  nuevoEjercicio: Ejercicio = new Ejercicio();   // Modelo ligado al formulario
  mensaje = '';                                 // Feedback al usuario

  constructor(private svc: EjercicioService,
              private router: Router) {}

  guardar() {
    this.svc.crearEjercicio(this.nuevoEjercicio).subscribe({
      next: () => {
        this.mensaje = 'Ejercicio creado ✅';
        setTimeout(() => this.router.navigate(['/ejercicios']), 1000);
      },
      error: err => this.mensaje = 'Error: ' + err.message
    });
  }

  limpiar() {
    this.nuevoEjercicio = new Ejercicio();
    this.mensaje = '';
  }
}
