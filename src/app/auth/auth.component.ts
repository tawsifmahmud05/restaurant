import { Component } from '@angular/core';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../dashboard/shared/loader.service';

@Component({
  selector: 'app-auth',
  // standalone: true,
  // imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  // Variables
  username: string = 'admin@mail.com';
  password: string = 'Admin@123';
  hide: boolean = true; // This will be used to toggle the visibility

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  // Password Visibility
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  // Login Button
  onSubmit(form: any) {
    if (form.valid) {
      this.authService.login(this.username, this.password).pipe(this.loaderService.attachLoader()).subscribe(
        (response) => {
          console.log('Login successful:', response);
          // Store the token and user data as needed
          // localStorage.setItem('token', response.token);
          // localStorage.setItem('user', JSON.stringify(response.user));
          // Redirect to admin component
          this.router.navigate(['dashboard']);
        },
        (error) => {
          console.error('Login failed:', error);
          // Handle login failure
        },
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
