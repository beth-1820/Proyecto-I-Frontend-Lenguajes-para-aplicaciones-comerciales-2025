import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinaService } from '../../../services/rutina.service';
import { Rutina } from '../../../domain/rutina.model';
import { ItemRutinaEjercicio } from '../../../domain/itemRutinaEjercicio.model';

@Component({
  selector: 'app-editar-rutina',
  templateUrl: './editar-rutina.component.html',
  styleUrls: ['./editar-rutina.component.css']
})
export class EditarRutinaComponent implements OnInit {
  rutina: Rutina = new Rutina(0,'',new Date(),new Date(),'','',0,0);
  items: ItemRutinaEjercicio[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rutinaService: RutinaService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    // Cargar la Rutina
    this.rutinaService.obtenerRutina(id).subscribe(r => {
      this.rutina = r;
      // cam[pos no editables: codRutina, idCliente, idInstructor, fechaCreacion]
    });

    // Cargar los ítems de la Rutina
    this.rutinaService.listarItems(id).subscribe(lst => this.items = lst);
  }

  onSubmit(form: any): void {
    const id = this.rutina.codRutina!;

    // Actualizar Rutina
    this.rutinaService.actualizarRutina(id, this.rutina).subscribe(() => {

      // Actualizar cada Item
      const updates$ = this.items.map(item =>
        this.rutinaService.actualizarItem(item.idItemRutinaEjercicio, item)
      );
      // Esperar a que todos terminen (puedes usar forkJoin si quieres manejar simultáneamente)

      // Redirigir a la lista
      this.router.navigate(['/rutinas']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/rutinas']);
  }
}