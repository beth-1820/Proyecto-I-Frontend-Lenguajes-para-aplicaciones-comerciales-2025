import { Component, OnInit } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';        //  ← ngModel
import { RouterModule }   from '@angular/router';       //  ← routerLink
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../domain/cliente.model';
import { Observable, of } from 'rxjs';

@Component({
  selector   : 'app-cliente-list',
  standalone : true,          //  ← stand-alone
  templateUrl: './cliente-list.component.html',
  styleUrls  : ['./cliente-list.component.css'],
  imports    : [              //  ← ¡IMPORTANTE!
      CommonModule,
      FormsModule,
      RouterModule
  ]
})
export class ClienteListComponent implements OnInit {

  /** almacena la lista completa para poder restaurarla */
  private todos$!: Observable<Cliente[]>;

  /** observable que la plantilla muestra en la tabla */
  clientes$!: Observable<Cliente[]>;

  /** modelos para la búsqueda / mensajes */
  idBuscado      = '';
  errorMsg       = '';
  clienteEncontrado: Cliente | null = null;

  constructor(private svc: ClienteService) {}

  ngOnInit(): void {
    this.todos$    = this.svc.getClientes();  // carga inicial
    this.clientes$ = this.todos$;             // se muestra completa
  }

  /** Buscar un cliente puntual */
  buscarPorId(): void {
    const id = Number(this.idBuscado);
    if (!id) { return; }

    this.svc.getCliente(id).subscribe({
      next: cli => {
        this.clientes$        = of([cli]);   // tabla con un solo registro
        this.clienteEncontrado = cli;
        this.errorMsg = '';
      },
      error: () => {
        this.errorMsg   = `No existe cliente con ID ${id}`;
        this.clientes$  = of([]);            // vacía la tabla
        this.clienteEncontrado = null;
      }
    });
  }

  /** ---- NUEVO: restaurar el listado completo ---- */
  restaurarLista(): void {
    this.clientes$          = this.todos$; // volvemos a la lista original
    this.errorMsg           = '';
    this.clienteEncontrado  = null;
    this.idBuscado          = '';
  }
}
