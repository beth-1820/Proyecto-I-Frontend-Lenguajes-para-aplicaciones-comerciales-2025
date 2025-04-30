import { Component }      from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterModule,
         Router }         from '@angular/router';
import { AuthService }    from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  idUser!: number;
  password = '';
  error    = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = '';
    this.auth.login(this.idUser, this.password).subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: () => this.error = 'ID o contraseña inválidos'
    });
  }
}
