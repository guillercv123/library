import { Injectable, inject, signal } from '@angular/core';
import {WeatherService} from '../../services/weather.service';


@Injectable({
  providedIn: 'root'
})
export class WeatherStore {

  private readonly weatherService = inject(WeatherService);

  readonly weather = signal<any | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly conditionKey = signal('default');

  loadCurrentLocationWeather(): void {

    if (this.weather()) {
      return;
    }

    if (!navigator.geolocation) {
      this.error.set('Geolocalización no soportada');
      return;
    }

    this.loading.set(true);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {

        this.weatherService
          .getByCoords(
            coords.latitude,
            coords.longitude
          )
          .subscribe({
            next: weather => {
              this.weather.set(weather);
            },
            error: () => {
              this.error.set('Error obteniendo clima');
            },
            complete: () => {
              this.loading.set(false);
            }
          });

      },
      () => {
        this.error.set('No se pudo obtener la ubicación');
        this.loading.set(false);
      }
    );
  }

  buscar(city: string): void {
    const cityName = city.trim();

    if (!cityName) {
      this.error.set('Ingrese una ciudad');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.weatherService.getByCity(cityName)
      .subscribe({
        next: (response) => {
          this.weather.set(response);
          this.conditionKey.set(
            response.condition.main.toLowerCase()
          );
        },
        error: () => {
          this.error.set('No se pudo obtener el clima');
          this.weather.set(null);
        },
        complete: () => {
          this.loading.set(false);
        }
      });
  }

}
