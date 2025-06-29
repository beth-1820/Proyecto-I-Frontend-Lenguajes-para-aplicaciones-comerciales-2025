import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  welcomeMessage: string;
  constructor(private homeService: HomeService) {
    this.welcomeMessage = this.homeService.getWelcomeMessage();
  }
}