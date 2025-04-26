export class Administrador{

    idAdmin?:number;
    nombreAdmin?:string;
    apellidosAdmin?:string;
    telefonoAdmin?:string;
    idUser?:number;

    constructor(
        idAdmin?: number,
        nombreAdmin?: string,
        apellidosAdmin?: string,
        telefonoAdmin?: string,
        idUser?: number
    ) {
        this.idAdmin = idAdmin;
        this.nombreAdmin = nombreAdmin;
        this.apellidosAdmin = apellidosAdmin;
        this.telefonoAdmin = telefonoAdmin;
        this.idUser = idUser;
    }

}