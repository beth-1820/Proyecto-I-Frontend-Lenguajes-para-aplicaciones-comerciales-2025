import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../domain/cliente.model';

@Component({
  standalone: true,
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ClienteListComponent implements OnInit {

  /** flujo con todos los clientes */
  clientes$!: Observable<Cliente[]>;   // solo declaramos, se asigna en ngOnInit

  constructor(private svc: ClienteService) {}

  ngOnInit(): void {
    // ahora ya existe this.svc → podemos usarlo
    this.clientes$ = this.svc.getClientes();
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar cliente?')) {
      this.svc.eliminarCliente(id).subscribe(() => {
        // refrescamos la lista después de borrar
        this.clientes$ = this.svc.getClientes();
      });
    }
  }

  botoncito(): void{
    console.log("test")
  }
}
