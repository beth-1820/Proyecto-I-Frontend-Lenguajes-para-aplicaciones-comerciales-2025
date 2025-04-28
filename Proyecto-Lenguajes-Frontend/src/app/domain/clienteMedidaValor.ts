export class ClienteMedidaValor {
  idCliente!: number;       // FK al cliente
  codMedida!: number;       // FK al catálogo de medidas
  valor: number | null;     // puede ser null

  constructor(
    idCliente: number,
    codMedida: number,
    valor: number | null = null
  ) {
    this.idCliente = idCliente;
    this.codMedida = codMedida;
    this.valor     = valor;
  }
}
