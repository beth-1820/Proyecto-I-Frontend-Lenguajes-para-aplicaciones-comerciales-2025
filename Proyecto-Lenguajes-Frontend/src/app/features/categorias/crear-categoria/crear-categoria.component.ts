import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../domain/categoria.model';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent {
  categoria: Categoria = new Categoria();
  errorMsg = '';
  successMsg = '';

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (!this.categoria.nombreCategoria) {
      this.errorMsg = 'El nombre de la categoría es requerido';
      return;
    }

    this.categoriaService.crearCategoria(this.categoria).subscribe({
      next: (response) => {
        this.successMsg = 'Categoría creada exitosamente';
        setTimeout(() => {
          this.router.navigate(['/categorias/listado']);
        }, 1500);
      },
      error: (err) => {
        this.errorMsg = 'Error al crear la categoría: ' + err.message;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/categorias/listado']);
  }
}