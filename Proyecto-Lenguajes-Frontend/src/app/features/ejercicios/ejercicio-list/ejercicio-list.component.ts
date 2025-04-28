import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule }      from '@angular/router';
import { Observable, of }    from 'rxjs';
import { delay, tap, switchMap } from 'rxjs/operators';

import { EjercicioService }  from '../../../services/ejercicio.service';
import { Ejercicio }         from '../../../domain/ejercicio.model';

@Component({
  standalone : true,
  selector   : 'app-ejercicio-list',
  imports    : [CommonModule, RouterModule],
  templateUrl: './ejercicio-list.component.html',
  styleUrls  : ['./ejercicio-list.component.css']
})
export class EjercicioListComponent implements OnInit {
  ejercicios$!: Observable<Ejercicio[]>;
  feedbackMsg = '';
  showToast   = false;

  constructor(private svc: EjercicioService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll() {
    this.ejercicios$ = this.svc.getEjercicios();
  }

  confirmEliminar(id: number): void {
    if (!confirm('¿Eliminar este ejercicio?')) return;

    this.svc.eliminarEjercicio(id)
      .pipe(
        tap(() => {
          this.feedbackMsg = 'Ejercicio eliminado ✅';
          this.showToast = true;
        }),
        // refresca lista tras eliminar
        switchMap(() => this.svc.getEjercicios()),
        // oculta el toast al cabo de 2s
        tap(() => setTimeout(() => this.showToast = false, 2000))
      )
      .subscribe({
        next: list => {
          this.ejercicios$ = of(list);
        },
        error: err => {
          this.feedbackMsg = 'Error al eliminar: ' + err.message;
          this.showToast = true;
          setTimeout(() => this.showToast = false, 2000);
        }
      });
  }
}
