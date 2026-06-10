import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {BookService} from './services/book.service';
import {WeatherSummaryComponent} from './commons/weather-summary/weather-summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, WeatherSummaryComponent, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly bookService = inject(BookService);

  cartCount(){
    return this.bookService.cartCount();
  }
}
