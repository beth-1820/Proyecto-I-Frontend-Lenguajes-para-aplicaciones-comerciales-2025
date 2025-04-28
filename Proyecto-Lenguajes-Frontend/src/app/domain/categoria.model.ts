export class Categoria {
    codCategoria?: number;
    nombreCategoria?: string;

    constructor(
        codCategoria?: number,
        nombreCategoria?: string
    ) {
        this.codCategoria = codCategoria;
        this.nombreCategoria = nombreCategoria;
    } 
}