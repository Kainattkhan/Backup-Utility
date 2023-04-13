import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';

import { SignupComponent } from './signup/signup.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getIsAuthenticated()) {
      const userRole = this.authService.getUserRole();
      if (next.data.role && next.data.role.indexOf(userRole) === -1) {
        this.router.navigate(['/login']);
        return false;
      }
      // user role is authorized, allow access
      return true;
    }
    // user is not authenticated, redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}

