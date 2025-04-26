export class Equipamiento {
    codEquipo:number=0;
    nombreEquipo:String;
    tipo:String;

    constructor (codEquipo:number,nombreEquipo:String, tipo:String){
        this.codEquipo = codEquipo;
        this.nombreEquipo = nombreEquipo;
        this.tipo = tipo;
    }
}