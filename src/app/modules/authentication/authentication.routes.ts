import { Routes } from "@angular/router";
import { NoAuthGuard } from "../../core/guard/no-auth.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [NoAuthGuard],
    loadComponent: () => import('./pages/sign-in/sign-in.component').then(c => c.SignInComponent)
  },
];

export default routes;
