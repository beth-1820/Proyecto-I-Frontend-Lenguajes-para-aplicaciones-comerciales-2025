export class Rutina {

    codRutina?: number;
    nombreMedida?: string;
    fechaCreacion?: Date;
    fechaRenovacion?: Date;
    objetivoCliente?: string;
    enfermedadesCliente?: string;
    idCliente?: number;
    idInstructor?: number;

    constructor(
        codRutina: number,
        nombreMedida: string,
        fechaCreacion: Date,
        fechaRenovacion: Date,
        objetivoCliente: string,
        enfermedadesCliente: string,
        idCliente: number,
        idInstructor: number
    ) {
        this.codRutina = codRutina;
        this.nombreMedida = nombreMedida;
        this.fechaCreacion = fechaCreacion;
        this.fechaRenovacion = fechaRenovacion;
        this.objetivoCliente = objetivoCliente;
        this.enfermedadesCliente = enfermedadesCliente;
        this.idCliente = idCliente;
        this.idInstructor = idInstructor;
    }
}