export class MedidaCorporal {
    codMedida:number=0;
    nombreMedida:String;
    unidadMedida:String;

    constructor (codMedida:number,nombreMedida:String, unidadMedida:String){
        this.nombreMedida = nombreMedida;
        this.codMedida = codMedida;
        this.unidadMedida = unidadMedida;
    }
}