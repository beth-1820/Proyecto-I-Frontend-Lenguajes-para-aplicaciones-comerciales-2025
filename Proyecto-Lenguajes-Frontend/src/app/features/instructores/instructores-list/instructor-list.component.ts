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
    nombreBuscado = '';
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
  const id = Number(this.idBuscado.trim());
  const nombre = this.nombreBuscado.trim();

  if (id <= 0 && !nombre) {
    this.errorMsg = 'Debe ingresar al menos un ID o un nombre';
    this.instructores$ = of([]);
    this.instructorDetalle = null;
    return;
  }

  this.svc.getInstructorByIdYNombre(id > 0 ? id : 0, nombre).subscribe({
    next: i => {
      this.instructores$ = of([i]);
      this.instructorDetalle = null;
      this.errorMsg = '';
    },
    error: () => {
      const criterio = id > 0 ? `ID ${id}` : `nombre "${nombre}"`;
      this.errorMsg = `No existe instructor con ${criterio}`;
      this.instructores$ = of([]);
      this.instructorDetalle = null;
    }
  });
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