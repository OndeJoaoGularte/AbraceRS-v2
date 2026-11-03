import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { LoginComponent } from './features/admin/login/login';
import { QuemSomosComponent } from './features/quem-somos/quem-somos';
import { ComoAtuamosComponent } from './features/como-atuamos/como-atuamos';
import { BlogComponent } from './features/blog/blog';
import { JunteSeComponent } from './features/junte-se/junte-se';
import { PostFormComponent } from './features/admin/pages/post-form/post-form';
import { ProjFormComponent } from './features/admin/pages/proj-form/proj-form';
import { ProjectDetailComponent } from './features/como-atuamos/project-detail/project-detail';
import { PostDetailComponent } from './features/blog/post-detail/post-detail';
import { SupportersListComponent } from './features/admin/pages/supporters-list/supporters-list';
import { SupporterFormComponent } from './features/admin/pages/supporter-form/supporter-form';
import { TeamListComponent } from './features/admin/pages/team-list/team-list';
import { TeamFormComponent } from './features/admin/pages/team-form/team-form';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'como-atuamos', component: ComoAtuamosComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'junte-se', component: JunteSeComponent },

  {
    path: 'admin/project/new',
    component: ProjFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/project/edit/:id',
    component: ProjFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/post/new',
    component: PostFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/post/edit/:id',
    component: PostFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/supporters',
    component: SupportersListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/supporter/new',
    component: SupporterFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/supporter/edit/:id',
    component: SupporterFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/team',
    component: TeamListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/team/new',
    component: TeamFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/team/edit/:id',
    component: TeamFormComponent,
    canActivate: [authGuard],
  },

  { path: '**', redirectTo: 'home' },
];
