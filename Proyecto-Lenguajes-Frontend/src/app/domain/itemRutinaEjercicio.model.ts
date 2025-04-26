export class ItemRutinaEjercicio {
    idItemRutinaEjercicio:number=0;
    seriesEjercicio:number=0;
    repeticionesEjercicio:number=0;
    codEjercicio:number=0;
    codRutina:number=0;
    
    constructor (idItemRutinaEjercicio:number,seriesEjercicio:number, repeticionesEjercicio:number,codEjercicio:number,codRutina:number){
        this.idItemRutinaEjercicio = idItemRutinaEjercicio;
        this.seriesEjercicio = seriesEjercicio;
        this.repeticionesEjercicio = repeticionesEjercicio;
        this.codEjercicio = codEjercicio;
        this.codRutina = codRutina;
    }
}