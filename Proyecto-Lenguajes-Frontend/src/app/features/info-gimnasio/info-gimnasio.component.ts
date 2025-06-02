import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-gimnasio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-gimnasio.component.html',
  styleUrls: ['./info-gimnasio.component.css']
})
export class InfoGimnasioComponent {
  nombre = 'Vitality Center';
  nombreLegal = 'Vitality Center S.A.';
  cedulaJuridica = '3-101-987654';
  direccion = 'Cartago, Paraíso, 300 metros este del parque central.';
  telefono = '+506 2222-3344';
  correo = 'info@vitalitycenter.cr';
  horario = 'Lunes a viernes: 6:00 a.m. – 9:00 p.m. / Sábados: 7:00 a.m. – 2:00 p.m.';
  sitioWeb = ' http://localhost:4200/home';
  redesSociales = [
    { nombre: 'Facebook', url: 'https://www.facebook.com/vitalitycenter' },
    { nombre: 'Instagram', url: 'https://www.instagram.com/vitalitycenter_cr' },
    { nombre: 'TikTok', url: 'https://www.tiktok.com/@vitalitycenter' }
  ];
  logoUrl = ''; // hay que poner la foto del logo aki
}
 

