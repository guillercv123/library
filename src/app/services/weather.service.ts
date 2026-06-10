import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {WeatherData} from '../models/weather.model';
import {environment} from '../environment/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly http = inject(HttpClient);

  private readonly BASE_URL = environment.apiUrl;

  getByCity(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.BASE_URL}?city=${encodeURIComponent(city)}`);
  }

  getByCoords(lat: number, lon: number): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.BASE_URL}/coords?lat=${lat}&lon=${lon}`);
  }
}
