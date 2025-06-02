import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';

import { InstructorService } from '../../../services/instructor.service';
import { Instructor } from '../../../domain/instructor.model';

@Component({
  selector: 'app-instructor-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {
  private todos$!: Observable<Instructor[]>;
  instructores$!: Observable<Instructor[]>;
  idBuscado = '';
  errorMsg = '';

  instructorDetalle: Instructor | null = null;
  showSuccess = false;

  constructor(private svc: InstructorService) {}

  ngOnInit(): void {
    this.todos$ = this.svc.getInstructores();
    this.instructores$ = this.todos$;
  }

  buscarInstructor(): void {
    const valor = this.idBuscado.trim();

    if (/^\d+$/.test(valor)) {
      const id = Number(valor);
      this.svc.getInstructor(id).subscribe({
        next: i => {
          this.instructores$ = of([i]);
          this.instructorDetalle = null;
          this.errorMsg = '';
        },
        error: () => {
          this.errorMsg = `No existe instructor con ID ${id}`;
          this.instructores$ = of([]);
          this.instructorDetalle = null;
        }
      });
    } else if (valor.length > 0) {
      this.svc.getInstructorPorNombre(valor).subscribe({
        next: lista => {
          this.instructores$ = of(lista);
          this.instructorDetalle = null;
          this.errorMsg = lista.length === 0 ? `No hay coincidencias con "${valor}"` : '';
        },
        error: () => {
          this.errorMsg = `Error al buscar por nombre`;
          this.instructores$ = of([]);
        }
      });
    } else {
      this.errorMsg = 'Ingrese un nombre o un ID válido';
    }
  }

  restaurarLista(): void {
    this.instructores$ = this.todos$;
    this.errorMsg = '';
    this.instructorDetalle = null;
    this.idBuscado = '';
  }

  abrirDetalle(i: Instructor): void {
    this.instructorDetalle = i;
  }

  cerrarDetalle(): void {
    this.instructorDetalle = null;
  }

  eliminarDetalle(): void {
    if (!this.instructorDetalle?.idInstructor) return;

    const confirmar = confirm('¿Está seguro que desea eliminar este instructor?');
    if (!confirmar) return;

    const id = this.instructorDetalle.idInstructor;
    this.svc.eliminarInstructor(id).subscribe({
      next: () => {
        this.todos$ = this.svc.getInstructores();
        this.instructores$ = this.todos$;
        this.cerrarDetalle();
      },
      error: err => this.errorMsg = 'Error al eliminar: ' + err.message
    });
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.cerrarDetalle();
  }
}
