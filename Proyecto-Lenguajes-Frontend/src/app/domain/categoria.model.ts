export class Categoria {
    codCategoria?: number = 0;
    nombreCategoria?: string = '';

    constructor(
        codCategoria?: number,
        nombreCategoria?: string
    ) {
        this.codCategoria = codCategoria;
        this.nombreCategoria = nombreCategoria;
    } 
}