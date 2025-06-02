// role.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRoles = route.data['roles'] as Array<string>;
    const userRole = this.auth.getUserRole();

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!expectedRoles || expectedRoles.includes(userRole!)) {
      return true;
    }

    // Redirigir a la página adecuada según el rol
    if (userRole === 'admin') {
      this.router.navigate(['/home']);
    } else if (userRole === 'instructor') {
      this.router.navigate(['/menu-instructores']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
}