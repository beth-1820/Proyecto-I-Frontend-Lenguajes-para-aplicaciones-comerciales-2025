import { Cliente } from './cliente.model';
import { Instructor } from './instructor.model';
import { ItemRutinaEjercicio } from './itemRutinaEjercicio.model';

export class Rutina {
  codRutina?: number;
  fechaCreacion?: Date;
  fechaRenovacion?: Date;
  objetivoCliente?: string;
  enfermedadesCliente?: string;
  cliente?: Cliente;
  instructor?: Instructor;
  ejercicios?: ItemRutinaEjercicio[]; // NUEVO: lista de ejercicios

  constructor(init?: Partial<Rutina>) {
    Object.assign(this, init);
  }
}
