import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if user is logged in
    if (localStorage.getItem('token')) {
      return true;
    } else {
      // Redirect to login page if not logged in
      this.router.navigate(['']);
      return false;
    }
  }
}
