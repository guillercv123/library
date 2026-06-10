import { Routes } from '@angular/router';
import {WeatherComponent} from './pages/weather/weather.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'weather', component: WeatherComponent },
  { path: 'home', component: DashboardComponent },
];
