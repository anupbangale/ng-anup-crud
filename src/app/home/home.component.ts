import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: any[];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.images = [
      { source: '../assets/images/galleria/galleria1.png' },
      { source: '../assets/images/galleria/galleria2.png' },
      { source: '../assets/images/galleria/galleria4.png' },
      { source: '../assets/images/galleria/galleria5.png' },
      { source: '../assets/images/galleria/galleria7.png' },
      { source: '../assets/images/galleria/galleria8.png' },
      { source: '../assets/images/galleria/galleria9.png' },
      { source: '../assets/images/galleria/galleria2.png' },
      { source: '../assets/images/galleria/galleria4.png' },
      { source: '../assets/images/galleria/galleria7.png' },
      { source: '../assets/images/galleria/galleria8.png' },
      { source: '../assets/images/galleria/galleria7.png' },
      { source: '../assets/images/galleria/galleria8.png' },
      { source: '../assets/images/galleria/galleria4.png' },
      { source: '../assets/images/galleria/galleria2.png' },
    ]; 
  }
}
