import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../new-order/order.services';
import { Order } from '../new-order/order.model';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser: Admin | null = null;

  order: Order | undefined;
  private orderSubscription!: Subscription;
  isToggled = false;

  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    this.isToggled = !this.isToggled;
    this.toggleSidebar.emit();
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private orderService: OrderService
  ) {

    this.orderSubscription = this.orderService.getOrder().subscribe(order => {
      this.order = order;
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
  }

  logout() {
    // // Clear localStorage or any stored user data
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');

    // // Redirect to login page
    // this.router.navigate(['']);
    // Log out the user using the AuthService
    this.authService.logout();

    // Clear the local state and redirect to login page
    this.currentUser = null;
    this.router.navigate(['']);
  }



}
