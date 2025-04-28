import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShareModule } from './shared/share/share.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShareModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Proyecto-Lenguajes-Frontend';
}
