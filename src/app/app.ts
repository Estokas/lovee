import { Component } from '@angular/core';
import { LovePageComponent } from './love-page/love-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LovePageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
