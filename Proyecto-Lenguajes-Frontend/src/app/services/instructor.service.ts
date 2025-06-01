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
  
 
getInstructorByIdYNombre(id: number, nombre: string): Observable<Instructor> {
  const params = new HttpParams().set('nombre', nombre);
  return this.http.get<Instructor>(`${this.url}/${id}`, { params });
}


  
   
    actualizarInstructor(c: Instructor): Observable<void> {
      return this.http.put<void>(`${this.url}/${c.idInstructor}`, c);
    }
  
  
    eliminarInstructor(id: number): Observable<void> {
      return this.http.delete<void>(`${this.url}/${id}`);
    }
  
    
  }