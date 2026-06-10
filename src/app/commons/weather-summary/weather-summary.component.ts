import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {WeatherStore} from '../store/weather.store';

@Component({
  selector: 'app-weather-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-summary.component.html',
  styleUrls: ['./weather-summary.component.css']
})
export class WeatherSummaryComponent implements OnInit {

  readonly weatherStore = inject(WeatherStore);

  ngOnInit(): void {
    this.weatherStore.loadCurrentLocationWeather();
  }

}
