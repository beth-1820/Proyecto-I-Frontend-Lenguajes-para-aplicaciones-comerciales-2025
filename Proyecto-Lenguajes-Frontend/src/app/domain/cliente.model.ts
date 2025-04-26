export class Cliente{

    idCliente?:number;
    nombreCliente?:string;
    apellidosCliente?:string;
    fechaNacimiento?:Date;
    telefonoCliente?:string;
    direccion?:string;
    nombreContactoEmergencia?:string;
    telContactoEmergencia?:string;
    
    constructor(
        idCliente?: number,
        nombreCliente?: string,
        apellidosCliente?: string,
        fechaNacimiento?: Date,
        telefonoCliente?: string,
        direccion?: string,
        nombreContactoEmergencia?: string,
        telContactoEmergencia?: string
    ) {
        this.idCliente = idCliente;
        this.nombreCliente = nombreCliente;
        this.apellidosCliente = apellidosCliente;
        this.fechaNacimiento = fechaNacimiento;
        this.telefonoCliente = telefonoCliente;
        this.direccion = direccion;
        this.nombreContactoEmergencia = nombreContactoEmergencia;
        this.telContactoEmergencia = telContactoEmergencia;
    }

}