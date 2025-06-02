import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { Observable, of } from 'rxjs';

import { InstructorService }     from '../../../services/instructor.service';
import { Instructor }            from '../../../domain/instructor.model';

@Component({
    selector   : 'app-instructor-list',
    standalone : true,
    imports    : [CommonModule, FormsModule, RouterModule],
    templateUrl: './instructor-list.component.html',
    styleUrls  : ['./instructor-list.component.css']
  })
  export class InstructorListComponent implements OnInit {
  
    /* ─── Listado ─── */
    private todos$!: Observable<Instructor[]>;
    instructores$!: Observable<Instructor[]>;
    idBuscado = '';
   buscarPorNombre: boolean = false;
    errorMsg  = '';
  
    /* ─── Modal DETALLE ─── */
    instructorDetalle: Instructor | null = null;
  
  
    /* ─── Toast éxito ─── */
    showSuccess = false;
  
    constructor(private svc: InstructorService) {}
  
    ngOnInit(): void {
      this.todos$    = this.svc.getInstructores();
      this.instructores$ = this.todos$;
    }
  
   buscar(): void {
    this.errorMsg = '';
    // Si hay cadena vacía, no hacemos nada
    if (!this.idBuscado || this.idBuscado.trim().length === 0) {
      return;
    }

    if (this.buscarPorNombre) {
      // BUSCAR POR NOMBRE
      const nombre = this.idBuscado.trim();
      this.svc.getInstructorPorNombre(nombre).subscribe({
        next: inst => {
          this.instructores$ = of([inst]);
          this.instructorDetalle = null;
          this.errorMsg = '';
        },
        error: () => {
          this.errorMsg = `No existe instructor con nombre "${nombre}"`;
          this.instructores$ = of([]);
          this.instructorDetalle = null;
        }
      });
    } else {
      // BUSCAR POR ID
      const id = Number(this.idBuscado);
      if (isNaN(id)) {
        this.errorMsg = 'Ingresa un ID válido';
        this.instructores$ = of([]);
        this.instructorDetalle = null;
        return;
      }
      this.svc.getInstructor(id).subscribe({
        next: inst => {
          this.instructores$ = of([inst]);
          this.instructorDetalle = null;
          this.errorMsg = '';
        },
        error: () => {
          this.errorMsg = `No existe categoría con ID ${id}`;
          this.instructores$ = of([]);
          this.instructorDetalle = null;
        }
      });
    }
  }
  
    restaurarLista(): void {
      this.instructores$      = this.todos$;
      this.errorMsg       = '';
      this.instructorDetalle = null;
      this.idBuscado      = '';
    }
  
    /* ─── Detalle ─── */
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


  }