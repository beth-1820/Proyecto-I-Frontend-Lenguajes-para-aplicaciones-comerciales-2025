import { Injectable } from '@angular/core';
import { Categoria } from '../domain/categoria.model';
import { environment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url: string = environment.API_URL + 'vitalitycenter/api/categorias';

  constructor(private http: HttpClient) { }

  /** GET todas las categorías */
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url);
  }

  /** GET categoría por ID */
  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.url}/${id}`);
  }

  /** POST nueva categoría */
  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.url, categoria, {
      headers: { 'Content-Type': 'application/json' } // Asegura el header
    });
  }

  /** PUT actualizar categoría */
  actualizarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.url}/${categoria.codCategoria}`, categoria);
  }

  /** DELETE categoría */
  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}