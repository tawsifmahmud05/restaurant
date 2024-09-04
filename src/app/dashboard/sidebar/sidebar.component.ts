import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  currentUser: Admin | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    // this.authService.currentUser$.subscribe((user) => {
    //   this.currentUser = user;
    // });

    this.currentUser = this.authService.getCurrentUser();
    console.log('Current User:', this.currentUser);

  }

  logout() {
    // // Clear localStorage or any stored user data
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');

    // // Update AuthService currentUserSubject to null
    // this.authService.currentUser$.subscribe(() => {
    //   this.authService.currentUserSubject.next(null);
    // });

    // // Redirect to login page
    // this.router.navigate(['']);

    this.authService.logout();
    this.currentUser = null; // Update local state
    this.router.navigate(['']);
  }
}
