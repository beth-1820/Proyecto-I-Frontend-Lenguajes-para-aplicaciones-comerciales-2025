import { Component, OnInit } from '@angular/core';
import { EjercicioService } from '../../../services/ejercicio.service';
import { Ejercicio } from '../../../domain/ejercicio.model';
import { Categoria } from '../../../domain/categoria.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ejercicio-detail',
  templateUrl: './ejercicio-detail.component.html',
  styleUrls: ['./ejercicio-detail.component.css']
})
export class EjercicioDetailComponent implements OnInit {

  categorias: Categoria[] = [];
  ejercicio: Ejercicio = new Ejercicio();
  mensaje: string = '';

  constructor(private ejercicioService: EjercicioService, private router: Router) { }

  ngOnInit(): void {
    this.ejercicioService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (err) => {
        this.mensaje = 'Error al cargar las categorías: ' + err.message;
      }
    });
  }

  guardarEjercicio(): void {
    this.ejercicioService.crearEjercicio(this.ejercicio).subscribe({
      next: (response) => {
        this.mensaje = 'Ejercicio creado exitosamente';
        setTimeout(() => this.router.navigate(['/ejercicios']), 1000);
      },
      error: (err) => {
        this.mensaje = 'Error al crear el ejercicio: ' + err.message;
      }
    });
  }

}
