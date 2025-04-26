export class Instructor{

    idInstructor?:number;
    nombreInstructor?:string;
    apellidosInstructor?:string;
    telefonoInstructor?:string;
    idUser?:number;

    constructor(
        idInstructor?: number,
        nombreInstructor?: string,
        apellidosInstructor?: string,
        telefonoInstructor?: string,
        idUser?: number
    ) {
        this.idInstructor = idInstructor;
        this.nombreInstructor = nombreInstructor;
        this.apellidosInstructor = apellidosInstructor;
        this.telefonoInstructor = telefonoInstructor;
        this.idUser = idUser;
    }
}