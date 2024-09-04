import { Component, Input, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../new-order/order.services';
import { Order, OrderItem } from '../new-order/order.model';
import { Food } from '../foods/food.model';
import { LoaderService } from '../shared/loader.service';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  quantity: number = 1;

  order: Order | undefined;
  foodList: Food[] | undefined;
  private orderSubscription!: Subscription;
  private foodSubscription!: Subscription;
  @Input() hideCart = true;

  constructor(private orderService: OrderService, private dataStorageService: DataStorageService, private loaderService: LoaderService,
    private notificationService: NotificationService,) {

  }


  ngOnInit(): void {
    // Subscribe to order changes
    this.orderSubscription = this.orderService.getOrder().subscribe(order => {
      this.order = order;
    });
    this.foodSubscription = this.orderService.getOrderFoods().subscribe(foodList => {
      this.foodList = foodList;
    });
  }



  onDeleteItem(food: any) {
    this.orderService.removeItemFromOrder(food.id);
  }



  getTotalPrice(foodId: number): number {
    var price = this.order?.items.find(item => item.foodId === foodId)?.totalPrice;
    if (price) {
      return price;
    }
    else {
      return 0;
    }
  }

  getQuantity(foodId: number): number {
    var quantity = this.order?.items.find(item => item.foodId === foodId)?.quantity;
    if (quantity) {
      return quantity;
    }
    else {
      return 0;
    }
  }

  addUnit(foodId: number) {
    this.orderService.addItemQuantity(foodId)
  }

  removeUnit(foodId: number) {
    this.orderService.removeItemQuantity(foodId)
  }

  submitOrder() {
    this.orderService.setOrderNumber(new Date().getTime().toString());

    this.dataStorageService.addOrder(this.order).pipe(this.loaderService.attachLoader()).subscribe(response => {
      console.log(response);
      this.notificationService.showSuccess("Order Placed")
    });

    this.orderService.removeOrder();
    this.orderService.removeFoods();
    this.hideCart = true;

  }






}
