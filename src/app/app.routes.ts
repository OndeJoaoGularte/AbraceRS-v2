import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { LoginComponent } from './features/admin/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];
