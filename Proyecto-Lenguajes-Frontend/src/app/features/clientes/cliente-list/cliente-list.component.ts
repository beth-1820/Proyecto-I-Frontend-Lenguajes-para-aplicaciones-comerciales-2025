import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { Observable, of } from 'rxjs';

import { ClienteService }     from '../../../services/cliente.service';
import { Cliente }            from '../../../domain/cliente.model';
import { ClienteMedidaValor } from '../../../domain/clienteMedidaValor';

@Component({
  selector   : 'app-cliente-list',
  standalone : true,
  imports    : [CommonModule, FormsModule, RouterModule],
  templateUrl: './cliente-list.component.html',
  styleUrls  : ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  /* ─── Listado ─── */
  private todos$!: Observable<Cliente[]>;
  clientes$!: Observable<Cliente[]>;
  idBuscado = '';
  errorMsg  = '';

  /* ─── Modal DETALLE ─── */
  clienteDetalle: Cliente | null = null;

  /* ─── Modal MEDIDAS ─── */
  showMedidasModal = false;
  medidasLabels = [
    'Bíceps','Tríceps','Antebrazo','Pecho',
    'Cintura','Cadera','Muslo','Pantorrilla',
    'Hombros','Espalda','Abdomen','Cuello'
  ];
  medidasValores: ClienteMedidaValor[] = [];
  private selectedCliente: Cliente | null = null;

  /* ─── Toast éxito ─── */
  showSuccess = false;

  constructor(private svc: ClienteService) {}

  ngOnInit(): void {
    this.todos$    = this.svc.getClientes();
    this.clientes$ = this.todos$;
  }

  /* ─── Listado & búsqueda ─── */
  buscarPorId(): void {
    const id = Number(this.idBuscado);
    if (!id) return;
    this.svc.getCliente(id).subscribe({
      next: c => {
        this.clientes$      = of([c]);
        this.clienteDetalle = null;
        this.errorMsg       = '';
      },
      error: () => {
        this.errorMsg       = `No existe cliente con ID ${id}`;
        this.clientes$      = of([]);
        this.clienteDetalle = null;
      }
    });
  }

  restaurarLista(): void {
    this.clientes$      = this.todos$;
    this.errorMsg       = '';
    this.clienteDetalle = null;
    this.idBuscado      = '';
  }

  /* ─── Detalle ─── */
  abrirDetalle(c: Cliente): void {
    this.clienteDetalle = c;
  }

  cerrarDetalle(): void {
    this.clienteDetalle = null;
  }

  eliminarDetalle(): void {
    if (!this.clienteDetalle?.idCliente) return;
    const id = this.clienteDetalle.idCliente;
    this.svc.eliminarCliente(id).subscribe({
      next: () => {
        this.todos$    = this.svc.getClientes();
        this.clientes$ = this.todos$;
        this.cerrarDetalle();
      },
      error: err => this.errorMsg = 'Error al eliminar: ' + err.message
    });
  }

  /* ─── Medidas ─── */
  verMedidas(): void {
    if (!this.clienteDetalle) return;
    this.selectedCliente = this.clienteDetalle;
    this.cerrarDetalle();

    const id = this.selectedCliente.idCliente!;
    // inicializa con null
    this.medidasValores = this.medidasLabels.map((_, i) =>
      new ClienteMedidaValor(id, i + 1, null)
    );
    // carga las que existan
    this.svc.getMedidas(id).subscribe(list => {
      list.forEach(saved => {
        const idx = this.medidasValores.findIndex(
          m => m.codMedida === saved.codMedida
        );
        if (idx >= 0) {
          this.medidasValores[idx].valor = saved.valor;
        }
      });
      this.showMedidasModal = true;
    });
  }

  cerrarMedidas(): void {
    this.showMedidasModal = false;
  }

  actualizarMedidas(): void {
    if (!this.selectedCliente) return;
    const id = this.selectedCliente.idCliente!;

    // Filtra para enviar solo las medidas con valor != null
    const payload = this.medidasValores.filter(m => m.valor !== null);

    this.svc.updateMedidas(id, payload).subscribe({
      next: () => {
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
          this.cerrarMedidas();
          this.clienteDetalle = this.selectedCliente;
        }, 2000);
      },
      error: err => this.errorMsg = 'Error al guardar medidas: ' + err.message
    });
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.showMedidasModal) this.cerrarMedidas();
    else this.cerrarDetalle();
  }
}
