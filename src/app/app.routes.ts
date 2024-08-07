import { Routes } from '@angular/router';
import { RedirectComponent } from './core/common/redirect/redirect.component';
import { NoAuthGuard } from './core/guard/no-auth.guard';


export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/auth' },
    {
        path: "auth",
        loadChildren: () => import("./modules/authentication/authentication.routes"),
        canActivate: [NoAuthGuard],
    },
    {
        path: "dashboard",
        loadChildren: () => import("./modules/dashboard/dashboard.routes"),
        canActivate: [NoAuthGuard],
    },
    {
        path: '403',
        canActivate: [NoAuthGuard],
        loadComponent: () => import('./core/common/403/403.component').then(c => c.Exception403Component)
    },
    {
        path: '404',
        canActivate: [NoAuthGuard],
        loadComponent: () => import('./core/common/404/404.component').then(c => c.Exception404Component)
    },
    { path: '**', component: RedirectComponent }
];
