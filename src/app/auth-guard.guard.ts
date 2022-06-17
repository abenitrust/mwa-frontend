import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
    let isLoggedIn = this.auth.authenticated();
    if (isLoggedIn) {
      return true
    } else {
      return this.router.parseUrl('/unauthorized');;
    }
  }

}
