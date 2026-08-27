import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { LoginComponent } from './features/admin/login/login';
import { QuemSomosComponent } from './features/quem-somos/quem-somos';
import { ComoAtuamosComponent } from './features/como-atuamos/como-atuamos';
import { BlogComponent } from './features/blog/blog';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'como-atuamos', component: ComoAtuamosComponent },
  { path: 'blog', component: BlogComponent }
];
