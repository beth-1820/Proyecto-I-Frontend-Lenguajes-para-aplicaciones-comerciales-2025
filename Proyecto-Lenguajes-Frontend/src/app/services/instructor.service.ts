import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import { HttpParams } from '@angular/common/http';

import { Instructor } from '../domain/instructor.model';

@Injectable({
    providedIn: 'root' 
  })
  export class InstructorService {
    private url: string = environment.API_URL + 'instructores';
  
    constructor(private http: HttpClient) {}
  
   
    getInstructores(): Observable<Instructor[]> {
      return this.http.get<Instructor[]>(this.url);
    }
  
 
  /** GET categoría por ID */
  getInstructor(id: number): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.url}/${id}`);
  }

  /** GET categoría por NOMBRE */
  getInstructorPorNombre(nombre: string): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.url}/nombre/${nombre}`);
  }


  
   
    actualizarInstructor(c: Instructor): Observable<void> {
      return this.http.put<void>(`${this.url}/${c.idInstructor}`, c);
    }
  
  
    eliminarInstructor(id: number): Observable<void> {
      return this.http.delete<void>(`${this.url}/${id}`);
    }
  
    
  }