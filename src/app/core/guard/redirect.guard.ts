// src/app/core/guard/redirect.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
    // private authService: AuthService, 
    constructor(private router: Router) { }

    canActivate(): boolean {
        // if (this.authService.isLoggedIn) {
        //     this.router.navigate(['/exception/404']);
        // } else {
        //     this.router.navigate(['/404']);
        // }
        return false;
    }
}
