export class Ejercicio {
    codEjercicio:number=0;
    nombreEjercicio:String;
    descripcion:String;
    codCategoria:number=0;
    codEquipo:number=0;

    constructor (
        codEjercicio:number,nombreEjercicio:String,descripcion:String,codCategoria:number,codEquipo:number
    ) {
        this.codEjercicio = codEjercicio;
        this.nombreEjercicio = nombreEjercicio;
        this.descripcion = descripcion;
        this.codCategoria = codCategoria;
        this.codEquipo = codEquipo;
    }
}