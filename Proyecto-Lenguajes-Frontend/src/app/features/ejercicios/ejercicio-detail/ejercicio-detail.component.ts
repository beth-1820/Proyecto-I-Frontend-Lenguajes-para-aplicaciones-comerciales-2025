import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { forkJoin }          from 'rxjs';
import { tap }               from 'rxjs/operators';

import { EjercicioService }  from '../../../services/ejercicio.service';
import { Ejercicio }         from '../../../domain/ejercicio.model';
import { Categoria }         from '../../../domain/categoria.model';
import { Equipamiento }      from '../../../domain/equipamiento.model';

@Component({
  standalone : true,
  selector   : 'app-ejercicio-detail',
  imports    : [CommonModule, FormsModule, RouterModule],
  templateUrl: './ejercicio-detail.component.html',
  styleUrls  : ['./ejercicio-detail.component.css']
})
export class EjercicioDetailComponent implements OnInit {
  ejercicio = new Ejercicio();
  categorias: Categoria[]    = [];
  equipos: Equipamiento[]    = [];
  isEdit = false;

  feedbackMsg = '';
  showToast   = false;

  constructor(
    private svc: EjercicioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Carga cat y eq
    forkJoin({
      cats: this.svc.getCategorias(),
      eqs:  this.svc.getEquipos()
    }).subscribe(({ cats, eqs }) => {
      this.categorias = cats;
      this.equipos    = eqs;
    });

    const id = Number(this.route.snapshot.params['id']);
    if (id) {
      this.isEdit = true;
      this.svc.getEjercicio(id).subscribe(e => this.ejercicio = e);
    }
  }

  save(): void {
    const op = this.isEdit
      ? this.svc.actualizarEjercicio(this.ejercicio.codEjercicio, this.ejercicio)
          .pipe(tap(() => this.feedbackMsg = 'Ejercicio actualizado ✅'))
      : this.svc.crearEjercicio(this.ejercicio)
          .pipe(tap(() => this.feedbackMsg = 'Ejercicio creado ✅'));

    op.subscribe({
      next: () => {
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
          this.router.navigate(['/ejercicios']);
        }, 1500);
      },
      error: (err: any) => {
        this.feedbackMsg = 'Error: ' + err.message;
        this.showToast   = true;
        setTimeout(() => this.showToast = false, 2000);
      }
    });
  }
}
