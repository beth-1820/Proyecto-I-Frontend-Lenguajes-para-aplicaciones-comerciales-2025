import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { Observable, of } from 'rxjs';

import { ClienteService } from '../../../services/cliente.service';
import { Cliente }        from '../../../domain/cliente.model';

@Component({
  selector   : 'app-cliente-list',
  standalone : true,
  templateUrl: './cliente-list.component.html',
  styleUrls  : ['./cliente-list.component.css'],
  imports    : [CommonModule, FormsModule, RouterModule]
})
export class ClienteListComponent implements OnInit {

  private todos$!: Observable<Cliente[]>;
  clientes$!: Observable<Cliente[]>;
  idBuscado = '';
  errorMsg  = '';

  clienteDetalle: Cliente | null = null;

  constructor(private svc: ClienteService) {}

  ngOnInit(): void {
    this.todos$    = this.svc.getClientes();
    this.clientes$ = this.todos$;
  }

  buscarPorId(): void {
    const id = Number(this.idBuscado);
    if (!id) return;
    this.svc.getCliente(id).subscribe({
      next: cli => {
        this.clientes$      = of([cli]);
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

  abrirDetalle(cli: Cliente): void {
    this.clienteDetalle = cli;
  }

  cerrarDetalle(): void {
    this.clienteDetalle = null;
  }

  /** ← NUEVO: elimina el cliente y recarga la lista */
  eliminarDetalle(): void {
    if (!this.clienteDetalle?.idCliente) return;
    const id = this.clienteDetalle.idCliente;
    this.svc.eliminarCliente(id).subscribe({
      next: () => {
        // refrescar lista tras borrar
        this.todos$    = this.svc.getClientes();
        this.clientes$ = this.todos$;
        this.cerrarDetalle();
      },
      error: err => {
        this.errorMsg = 'Error al eliminar: ' + err.message;
      }
    });
  }

  verMedidas(): void {
    // Aquí luego puedes programar navegación, modal, etc.
    console.log('Ver medidas (futuro)');
  }
  
  @HostListener('document:keydown.escape')
  onEsc() { this.cerrarDetalle(); }
}
