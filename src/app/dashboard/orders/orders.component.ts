import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { LoaderService } from '../shared/loader.service';
import { NotificationService } from '../shared/notification/notification.service';
import { Order } from './order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  chunkedOrders: Order[][] = [];
  isFoundData = false;

  constructor(private dataStorageService: DataStorageService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.dataStorageService.getOrders().pipe(this.loaderService.attachLoader()).subscribe(data => {

      this.orders = data.data;
      this.chunkOrders();
      this.isFoundData = true;
    },
      error => {
        this.notificationService.showError("Try again");
        this.loaderService.hideLoader();
      });
  }

  chunkOrders(): void {
    this.chunkedOrders = [];
    for (let i = 0; i < this.orders.length; i += 3) {
      this.chunkedOrders.push(this.orders.slice(i, i + 3));
    }
  }

  onDeleteReload(isdeleted: boolean) {
    this.dataStorageService.getOrders().pipe(this.loaderService.attachLoader()).subscribe(data => {

      this.orders = data.data;
      this.chunkOrders();
      console.log(this.chunkedOrders);

    });
  }


}