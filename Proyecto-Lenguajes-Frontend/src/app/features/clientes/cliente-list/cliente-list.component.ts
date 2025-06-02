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

  private todos$!: Observable<Cliente[]>;
  clientes$!: Observable<Cliente[]>;
  idBuscado = '';
  errorMsg  = '';

  clienteDetalle: Cliente | null = null;

  showMedidasModal = false;
  medidasLabels = [
    'Bíceps','Tríceps','Antebrazo','Pecho',
    'Cintura','Cadera','Muslo','Pantorrilla',
    'Hombros','Espalda','Abdomen','Cuello'
  ];
  medidasValores: ClienteMedidaValor[] = [];
  private selectedCliente: Cliente | null = null;

  showSuccess = false;

  constructor(private svc: ClienteService) {}

  ngOnInit(): void {
    this.todos$    = this.svc.getClientes();
    this.clientes$ = this.todos$;
  }

  buscarCliente(): void {
    const valor = this.idBuscado.trim();

    if (/^\d+$/.test(valor)) {
      const id = Number(valor);
      this.svc.getCliente(id).subscribe({
        next: c => {
          this.clientes$ = of([c]);
          this.clienteDetalle = null;
          this.errorMsg = '';
        },
        error: () => {
          this.errorMsg = `No existe cliente con ID ${id}`;
          this.clientes$ = of([]);
          this.clienteDetalle = null;
        }
      });
    } else if (valor.length > 0) {
      this.svc.buscarPorNombre(valor).subscribe({
        next: clientes => {
          this.clientes$ = of(clientes);
          this.clienteDetalle = null;
          this.errorMsg = clientes.length === 0 ? `No hay coincidencias con "${valor}"` : '';
        },
        error: () => {
          this.errorMsg = `Error al buscar por nombre`;
          this.clientes$ = of([]);
        }
      });
    } else {
      this.errorMsg = 'Ingrese un nombre o un ID válido';
    }
  }

  restaurarLista(): void {
    this.clientes$      = this.todos$;
    this.errorMsg       = '';
    this.clienteDetalle = null;
    this.idBuscado      = '';
  }

  abrirDetalle(c: Cliente): void {
    this.clienteDetalle = c;
  }

  cerrarDetalle(): void {
    this.clienteDetalle = null;
  }

  eliminarDetalle(): void {
  if (!this.clienteDetalle?.idCliente) return;

  const nombre = `${this.clienteDetalle.nombreCliente} ${this.clienteDetalle.apellidosCliente}`;
  const confirmado = window.confirm(`¿Está seguro que desea eliminar al cliente "${nombre}"?`);

  if (!confirmado) {
    return;
  }

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

  verMedidas(): void {
    if (!this.clienteDetalle) return;
    this.selectedCliente = this.clienteDetalle;
    this.cerrarDetalle();

    const id = this.selectedCliente.idCliente!;
    this.medidasValores = this.medidasLabels.map((_, i) =>
      new ClienteMedidaValor(id, i + 1, null)
    );

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
