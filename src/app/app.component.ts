import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { FooterComponent } from './core/layout/components/footer/footer.component';
import { HeaderComponent } from './core/layout/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent,
    FooterComponent, RouterModule, CommonModule],
  styles: [
    `
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 20%;
      background-color: #fff;
      z-index: 1000;
    }
    `
  ]
})

export class AppComponent {
  title = 'Keur Mamou Xaleeyi';
}
