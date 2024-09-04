import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Ensure you have an AuthService to manage authentication state

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.getToken()) { // Check if the user is logged in
            this.router.navigate(['/dashboard']); // Redirect to dashboard if logged in
            return false;
        }
        return true; // Allow access to the login page if not logged in
    }
}
