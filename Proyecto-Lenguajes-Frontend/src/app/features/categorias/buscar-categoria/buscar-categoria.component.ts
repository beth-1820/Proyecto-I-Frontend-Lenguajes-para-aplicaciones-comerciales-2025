import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';

import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../domain/categoria.model';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  templateUrl: './buscar-categoria.component.html',
  styleUrls: ['./buscar-categoria.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class CategoriaListComponent implements OnInit {

  private todos$!: Observable<Categoria[]>;
  categorias$!: Observable<Categoria[]>;
  idBuscado = '';
  errorMsg = '';

  categoriaDetalle: Categoria | null = null;

  constructor(private svc: CategoriaService) {}

  ngOnInit(): void {
    this.todos$ = this.svc.getCategorias();
    this.categorias$ = this.todos$;
  }

  buscarPorId(): void {
    const id = Number(this.idBuscado);
    if (!id) return;
    this.svc.getCategoria(id).subscribe({
      next: cat => {
        this.categorias$ = of([cat]);
        this.categoriaDetalle = null;
        this.errorMsg = '';
      },
      error: () => {
        this.errorMsg = `No existe categoría con ID ${id}`;
        this.categorias$ = of([]);
        this.categoriaDetalle = null;
      }
    });
  }

  restaurarLista(): void {
    this.categorias$ = this.todos$;
    this.errorMsg = '';
    this.categoriaDetalle = null;
    this.idBuscado = '';
  }

  abrirDetalle(cat: Categoria): void {
    this.categoriaDetalle = cat;
  }

  cerrarDetalle(): void {
    this.categoriaDetalle = null;
  }

  /** Elimina la categoría y recarga la lista */
  eliminarDetalle(): void {
    if (!this.categoriaDetalle?.codCategoria) return;
    const id = this.categoriaDetalle.codCategoria;
    this.svc.eliminarCategoria(id).subscribe({
      next: () => {
        // refresca lista cuando borra
        this.todos$ = this.svc.getCategorias();
        this.categorias$ = this.todos$;
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