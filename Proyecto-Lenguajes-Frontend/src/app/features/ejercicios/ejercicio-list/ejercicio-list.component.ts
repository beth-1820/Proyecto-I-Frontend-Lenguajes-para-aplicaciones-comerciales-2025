import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { Observable, of } from 'rxjs';

import { EjercicioService } from '../../../services/ejercicio.service';
import { Ejercicio }        from '../../../domain/ejercicio.model';

@Component({
  selector: 'app-ejercicio-list',
  standalone: true,
  templateUrl: './ejercicio-list.component.html',
  styleUrls: ['./ejercicio-list.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class EjercicioListComponent implements OnInit {

  private todos$!: Observable<Ejercicio[]>;
  ejercicios$!: Observable<Ejercicio[]>;
  idBuscado = '';
  errorMsg  = '';

  ejercicioDetalle: Ejercicio | null = null;

  constructor(private svc: EjercicioService) {}

  ngOnInit(): void {
    this.todos$ = this.svc.getEjercicios();
    this.ejercicios$ = this.todos$;
  }

  buscarPorId(): void {
    const id = Number(this.idBuscado);
    if (!id) return;
    this.svc.getEjercicio(id).subscribe({
      next: ej => {
        this.ejercicios$ = of([ej]);
        this.ejercicioDetalle = null;
        this.errorMsg = '';
      },
      error: () => {
        this.errorMsg = `No existe ejercicio con ID ${id}`;
        this.ejercicios$ = of([]);
        this.ejercicioDetalle = null;
      }
    });
  }

  restaurarLista(): void {
    this.ejercicios$ = this.todos$;
    this.errorMsg = '';
    this.ejercicioDetalle = null;
    this.idBuscado = '';
  }

  abrirDetalle(ej: Ejercicio): void {
    this.ejercicioDetalle = ej;
  }

  cerrarDetalle(): void {
    this.ejercicioDetalle = null;
  }

  eliminarDetalle(): void {
    if (!this.ejercicioDetalle?.codEjercicio) return;
    const id = this.ejercicioDetalle.codEjercicio;
    this.svc.eliminarEjercicio(id).subscribe({
      next: () => {
        // refrescar lista tras borrar
        this.todos$ = this.svc.getEjercicios();
        this.ejercicios$ = this.todos$;
        this.cerrarDetalle();
      },
      error: err => {
        this.errorMsg = 'Error al eliminar: ' + err.message;
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEsc() { this.cerrarDetalle(); }
}
