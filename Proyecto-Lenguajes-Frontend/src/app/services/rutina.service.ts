import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rutina } from '../domain/rutina.model';
import { ItemRutinaEjercicio } from '../domain/itemRutinaEjercicio.model';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  private rutinaUrl = 'http://localhost:8080/api/rutinas';
  private itemRutinaEjercicioUrl = 'http://localhost:8080/api/item-rutina-ejercicio';

  constructor(private http: HttpClient) {}

  // Crear una rutina y recibir el ID generado por el backend
  crearRutina(rutina: Rutina): Observable<number> { 
    return this.http.post<number>(this.rutinaUrl, rutina);
  }

  // Agregar un ejercicio a una rutina
  agregarItemEjercicio(item: ItemRutinaEjercicio): Observable<void> {
    return this.http.post<void>(this.itemRutinaEjercicioUrl, item);
  }
}
