import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'post/:id', renderMode: RenderMode.Server },
  { path: 'project/:id', renderMode: RenderMode.Server },

  { path: 'admin/post/new', renderMode: RenderMode.Client },
  { path: 'admin/post/edit/:id', renderMode: RenderMode.Client },
  { path: 'admin/project/new', renderMode: RenderMode.Client },
  { path: 'admin/project/edit/:id', renderMode: RenderMode.Client },
  { path: 'admin/supporters', renderMode: RenderMode.Client },
  { path: 'admin/supporter/new', renderMode: RenderMode.Client },
  { path: 'admin/supporter/edit/:id', renderMode: RenderMode.Client },
  { path: 'admin/team', renderMode: RenderMode.Client },
  { path: 'admin/team/new', renderMode: RenderMode.Client },
  { path: 'admin/team/edit/:id', renderMode: RenderMode.Client },
  { path: 'admin/highlights', renderMode: RenderMode.Client },
  { path: 'admin/highlight/new', renderMode: RenderMode.Client },
  { path: 'admin/highlight/edit/:id', renderMode: RenderMode.Client },
  { path: 'login', renderMode: RenderMode.Prerender },

  { path: '**', renderMode: RenderMode.Prerender },
];
