import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../orders/order.model';
import { DataStorageService } from '../data-storage.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input()
  order!: Order;
  @Output() ondeleteOrder = new EventEmitter<boolean>();

  statuses = [
    { value: '0', label: 'Pending' },
    { value: '1', label: 'Confirmed' },
    { value: '2', label: 'Preparing' },
    { value: '3', label: 'Prepared to Serve' },
    { value: '4', label: 'Served' },
    { value: '5', label: 'Paid' }
  ];

  selectedStatus: string | undefined;
  selectedStatusValue: string | undefined;


  constructor(private router: Router, private dataStorageService: DataStorageService, private loaderService: LoaderService, private notificationService: NotificationService) { }
  ngOnInit(): void {
    console.log(this.order);
    this.loadOrderStatus();
    this.selectedStatusValue = this.getValueFromLabel(this.selectedStatus!);
  }

  getValueFromLabel(label: string): string {
    const status = this.statuses.find(s => s.label === label);
    return status ? status.value : '';
  }

  onStatusChange(status: string): void {
    if (this.order) {
      this.dataStorageService.updateOrderStatus(this.order.id, parseInt(status)).subscribe(() => {
        this.notificationService.showSuccess("Order Status updated successfully.")
        console.log('Order status updated to:', status);

      });
    }
  }

  // Load current order status from service and set selectedStatus
  loadOrderStatus(): void {
    this.selectedStatus = this.order.orderStatus;
  }

  deleteOrder(orderId: string) {
    this.dataStorageService.deleteOrder(orderId).subscribe(response => {
      this.notificationService.showSuccess("Order deleted successfully")
      this.ondeleteOrder.emit(true)
    },
      error => {
        this.loaderService.hideLoader();
        console.error('Error adding employee', error);
        this.notificationService.showError("Please try again!")

      });

  }
}
