// src/app/models/item-rutina-ejercicio.model.ts

export class ItemRutinaEjercicio {
  idItemRutinaEjercicio?: number;
  seriesEjercicio!: number;
  repeticionesEjercicio!: number;
  codEjercicio!: number;
  codRutina!: number;

  constructor(init?: Partial<ItemRutinaEjercicio>) {
    Object.assign(this, init);
  }
}
