import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    console.log('canactive route>', route);
    console.log('canactive state', state);
    console.log('fragment', route.fragment);
    if (route.fragment === null) {
      console.log('IN');
      
      return false;
    }
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
