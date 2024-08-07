import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guard/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    data: { breadcrumb: 'แดชบอร์ด' },
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  }
];

export default routes;
