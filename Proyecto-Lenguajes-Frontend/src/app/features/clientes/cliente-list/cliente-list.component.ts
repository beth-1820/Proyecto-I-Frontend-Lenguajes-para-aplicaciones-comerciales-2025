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

  /* ───── Listado y búsqueda ───── */
  private todos$!: Observable<Cliente[]>;
  clientes$!: Observable<Cliente[]>;
  idBuscado = '';
  errorMsg  = '';

  /* ───── Modal de detalle ───── */
  clienteDetalle: Cliente | null = null;

  constructor(private svc: ClienteService) {}

  ngOnInit(): void {
    this.todos$    = this.svc.getClientes();
    this.clientes$ = this.todos$;
  }

  buscarPorId(): void {
    const id = Number(this.idBuscado);
    if (!id) { return; }

    this.svc.getCliente(id).subscribe({
      next : cli => {
        this.clientes$       = of([cli]);
        this.clienteDetalle  = null;
        this.errorMsg        = '';
      },
      error: () => {
        this.errorMsg        = `No existe cliente con ID ${id}`;
        this.clientes$       = of([]);
        this.clienteDetalle  = null;
      }
    });
  }

  restaurarLista(): void {
    this.clientes$      = this.todos$;
    this.errorMsg       = '';
    this.clienteDetalle = null;
    this.idBuscado      = '';
  }

  /* ───── Modal handlers ───── */
  abrirDetalle(cli: Cliente): void {
    this.clienteDetalle = cli;
    /* OPCIONAL: mover foco al botón Cerrar
       setTimeout(() => document.querySelector<HTMLButtonElement>('#btnClose')?.focus()); */
  }

  cerrarDetalle(): void {
    this.clienteDetalle = null;
  }

  /* Cerrar con tecla Escape */
  @HostListener('document:keydown.escape')
  onEsc() { this.cerrarDetalle(); }
}
