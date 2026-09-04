import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'post/:id', renderMode: RenderMode.Server },
  { path: 'project/:id', renderMode: RenderMode.Server },
  
  { path: 'admin/post/edit/:id', renderMode: RenderMode.Client },
  { path: 'admin/project/edit/:id', renderMode: RenderMode.Client },

  { path: '**', renderMode: RenderMode.Prerender }
];
