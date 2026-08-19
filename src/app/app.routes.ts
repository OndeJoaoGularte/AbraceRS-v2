import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { LoginComponent } from './features/admin/login/login';
import { QuemSomosComponent } from './features/quem-somos/quem-somos';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'quem-somos', component: QuemSomosComponent}
];
