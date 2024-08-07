import { Routes } from "@angular/router";
import { NoAuthGuard } from "../guard/no-auth.guard";

const routes: Routes = [
  {
    path: '401',
    canActivate: [NoAuthGuard],
    loadComponent: () => import('./401/401.component').then(c => c.Exception401Component)
  },
  {
    path: '403',
    canActivate: [NoAuthGuard],
    loadComponent: () => import('./403/403.component').then(c => c.Exception403Component)
  },
  {
    path: '404',
    canActivate: [NoAuthGuard],
    loadComponent: () => import('./404/404.component').then(c => c.Exception404Component)
  },
  {
    path: '500',
    canActivate: [NoAuthGuard],
    loadComponent: () => import('./500/500.component').then(c => c.Exception500Component)
  },
];

export default routes;
