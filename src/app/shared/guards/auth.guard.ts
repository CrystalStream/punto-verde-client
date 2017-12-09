import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private AuthService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.AuthService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
