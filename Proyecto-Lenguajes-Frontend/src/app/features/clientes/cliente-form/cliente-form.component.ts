import { Component } from '@angular/core';
import { Cliente } from '../../../domain/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';          // ← template-driven para atar [(ngModel)]
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  imports: [CommonModule, FormsModule]                 // necesita FormsModule
})
export class ClienteFormComponent {

  /* propiedades que enlazamos en la plantilla */
  nuevoCliente: Cliente = new Cliente();               // modelo ligado al formulario
  mensaje = '';                                        // feedback al usuario

  constructor(private svc: ClienteService,
              private router: Router) {}

  guardar() {
    this.svc.crearCliente(this.nuevoCliente).subscribe({
      next: () => {
        this.mensaje = 'Cliente creado ✅';
        setTimeout(() => this.router.navigate(['/clientes']), 1000);
      },
      error: err => this.mensaje = 'Error: ' + err.message
    });
  }

  limpiar() {           // método ejemplo tipo “reset()” del slide
    this.nuevoCliente = new Cliente();
    this.mensaje = '';
  }
}
