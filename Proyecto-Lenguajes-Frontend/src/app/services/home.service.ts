import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  getWelcomeMessage(): string {
    return 'Somos más que un gimnasio: somos un espacio donde cada persona encuentra la motivación para superarse, la comunidad que la impulsa a seguir adelante y las herramientas para transformar su bienestar físico y mental. Ofrecemos más que máquinas y rutinas; brindamos apoyo, orientación profesional y un ambiente diseñado para inspirar constancia, disciplina y confianza. Aquí, cada meta cuenta y cada esfuerzo es reconocido. En cada sesión, ayudamos a construir versiones más fuertes, sanas y felices de quienes confían en nosotros.';
  }

}