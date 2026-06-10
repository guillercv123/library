import {Component, inject, signal} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {WeatherData} from '../../models/weather.model';
import {DatePipe, DecimalPipe} from '@angular/common';
import {WeatherStore} from '../../commons/store/weather.store';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
 readonly weatherStore = inject(WeatherStore);

  readonly weather = signal<WeatherData | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly cityQuery = signal('');
  readonly conditionKey = signal('default');

  buscar(city: string): void {
    this.weatherStore.buscar(city);
  }

  usarUbicacion(): void {
    this.weatherStore.weather.set(null);
    this.weatherStore.loadCurrentLocationWeather();
  }

}
