export class Usuario{
    
    idUser?:number;
    email?:string;
    password?:string;
    estado?:number;
    rol?:string;

    constructor(
        idUser?: number,
        email?: string,
        password?: string,
        estado?: number,
        rol?: string
    ) {
        this.idUser = idUser;
        this.email = email;
        this.password = password;
        this.estado = estado;
        this.rol = rol;
    }

}