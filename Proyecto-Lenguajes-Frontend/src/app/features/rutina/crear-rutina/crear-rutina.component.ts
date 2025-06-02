import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 Necesario para ngModel y ngForm
import { CommonModule } from '@angular/common'; // 👈 Necesario para *ngIf, *ngFor, etc.
import { Rutina } from '../../../domain/rutina.model';
import { ItemRutinaEjercicio } from '../../../domain/itemRutinaEjercicio.model';
import { RutinaService } from '../../../services/rutina.service';

@Component({
  selector: 'app-crear-rutina',
  standalone: true, // 👈 Indica que este componente no depende de un NgModule
  imports: [CommonModule, FormsModule], // 👈 Importación de módulos necesarios
  templateUrl: './crear-rutina.component.html'
})
export class CrearRutinaComponent {
  rutina: Rutina = new Rutina(0, '', new Date(), new Date(), '', '', 0, 0);
  ejercicios: ItemRutinaEjercicio[] = [];
  nuevoEjercicio: ItemRutinaEjercicio = new ItemRutinaEjercicio(0, 0, 0, 0, 0);

  mensaje: string = '';
  error: string = '';

  constructor(private rutinaService: RutinaService) {}

  agregarEjercicio() {
    const { codEjercicio, seriesEjercicio, repeticionesEjercicio } = this.nuevoEjercicio;

    if (codEjercicio > 0 && seriesEjercicio > 0 && repeticionesEjercicio > 0) {
      this.ejercicios.push({ ...this.nuevoEjercicio });
      this.nuevoEjercicio = new ItemRutinaEjercicio(0, 0, 0, 0, 0);
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

    if (this.ejercicios.length === 0) {
      this.error = 'Debe agregar al menos un ejercicio.';
      return;
    }

    this.rutinaService.crearRutina(this.rutina).subscribe({
      next: (codRutina: number) => {
        const tareas = this.ejercicios.map(ej => {
          ej.codRutina = codRutina;
          return this.rutinaService.agregarItemEjercicio(ej).toPromise();
        });

        Promise.all(tareas)
          .then(() => {
            this.mensaje = 'Rutina y ejercicios creados exitosamente';
            this.resetearFormulario();
          })
          .catch(err => {
            this.error = 'Error al guardar los ejercicios: ' + err.message;
          });
      },
      error: err => {
        this.error = 'Error al guardar la rutina: ' + err.message;
      }
    });
  }

  resetearFormulario() {
    this.rutina = new Rutina(0, '', new Date(), new Date(), '', '', 0, 0);
    this.ejercicios = [];
    this.nuevoEjercicio = new ItemRutinaEjercicio(0, 0, 0, 0, 0);
  }
}
