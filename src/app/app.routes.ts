import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { LoginComponent } from './features/admin/login/login';
import { QuemSomosComponent } from './features/quem-somos/quem-somos';
import { ComoAtuamosComponent } from './features/como-atuamos/como-atuamos';
import { BlogComponent } from './features/blog/blog';
import { JunteSeComponent } from './features/junte-se/junte-se';
import { PostFormComponent } from './features/admin/pages/post-form/post-form';
import { ProjFormComponent } from './features/admin/pages/proj-form/proj-form';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'como-atuamos', component: ComoAtuamosComponent },
  {
    path: 'admin/project/new',
    component: ProjFormComponent,
  },
  {
    path: 'admin/project/edit/:id',
    component: ProjFormComponent,
  },
  { path: 'blog', component: BlogComponent },
  {
    path: 'admin/post/new',
    component: PostFormComponent,
  },
  {
    path: 'admin/post/edit/:id',
    component: PostFormComponent,
  },
  { path: 'junte-se', component: JunteSeComponent },
  { path: '**', redirectTo: 'home' },
];
