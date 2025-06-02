import { Rutina } from './rutina.model';
import { ItemRutinaEjercicio } from './itemRutinaEjercicio.model';

export interface ReporteRutinaDTO {
  rutina: Rutina;
  ejercicios: ItemRutinaEjercicio[];
}
