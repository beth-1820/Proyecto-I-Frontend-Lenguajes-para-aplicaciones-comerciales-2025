export class Ejercicio {
    codEjercicio: number;
    nombreEjercicio: string;
    descripcion: string;
    codCategoria: number;
    codEquipo: number;
  
    constructor(
      codEjercicio: number     = 0,
      nombreEjercicio: string  = '',
      descripcion: string      = '',
      codCategoria: number     = 0,
      codEquipo: number        = 0
    ) {
      this.codEjercicio     = codEjercicio;
      this.nombreEjercicio  = nombreEjercicio;
      this.descripcion      = descripcion;
      this.codCategoria     = codCategoria;
      this.codEquipo        = codEquipo;
    }
  }
  