import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinaService } from '../../../services/rutina.service';
import { Rutina } from '../../../domain/rutina.model';
import { ItemRutinaEjercicio } from '../../../domain/itemRutinaEjercicio.model';

@Component({
  selector: 'app-editar-rutina',
  templateUrl: './editar-rutina.component.html',
  standalone: true,  // si es standalone
  imports: [CommonModule, FormsModule],  // <--- importante
  styleUrls: ['./editar-rutina.component.css']
})
export class EditarRutinaComponent implements OnInit {
  rutina: Rutina = new Rutina();
  ejercicios: ItemRutinaEjercicio[] = [];
  error: string | null = null;
  mensaje: string | null = null;

  // Para modificar series o repeticiones de ejercicios existentes
  editarEjercicio: ItemRutinaEjercicio = new ItemRutinaEjercicio();

  constructor(
    private rutinaService: RutinaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cargarRutina(id);
      this.cargarEjercicios(id);
    }
  }

  cargarRutina(id: number): void {
    this.rutinaService.obtenerRutinaPorId(id).subscribe({
      next: (data) => {
        this.rutina = data;
      },
      error: (err) => (this.error = 'Error al cargar rutina: ' + err.message)
    });
  }

  cargarEjercicios(id: number): void {
    this.rutinaService.obtenerEjerciciosPorRutina(id).subscribe({
      next: (data) => {
        this.ejercicios = data;
      },
      error: (err) => (this.error = 'Error al cargar ejercicios: ' + err.message)
    });
  }

  guardarCambios(): void {
    this.error = null;
    this.mensaje = null;

    // Primero actualizamos la rutina
    this.rutinaService.actualizarRutina(this.rutina.codRutina!, this.rutina).subscribe({
      next: () => {
        // Luego actualizamos cada ejercicio modificado
        const peticiones = this.ejercicios.map(ejercicio =>
          this.rutinaService.actualizarItemEjercicio(ejercicio.idItemRutinaEjercicio!, ejercicio)
        );

        // Ejecutar todas las peticiones
        Promise.all(peticiones.map(p => p.toPromise()))
          .then(() => {
            this.mensaje = 'Rutina y ejercicios actualizados correctamente.';
            // Opcional: redirigir o limpiar formularios aquí
            this.router.navigate(['/rutinas']);
          })
          .catch((err) => {
            this.error = 'Error al actualizar ejercicios: ' + err.message;
          });
      },
      error: (err) => (this.error = 'Error al actualizar rutina: ' + err.message)
    });
  }

  // Opcional para actualizar datos del ejercicio directamente en la tabla
  actualizarEjercicio(index: number, field: 'seriesEjercicio' | 'repeticionesEjercicio', value: number) {
    if (this.ejercicios[index]) {
      if (field === 'seriesEjercicio') this.ejercicios[index].seriesEjercicio = value;
      if (field === 'repeticionesEjercicio') this.ejercicios[index].repeticionesEjercicio = value;
    }
  }
}
