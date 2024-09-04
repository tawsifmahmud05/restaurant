import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { LoaderService } from '../shared/loader.service';
import { NotificationService } from '../shared/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { Table } from '../tables/table.model';
import { Food } from '../foods/food.model';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent implements OnInit {

  tableData: Table[] = [];
  foodData: Food[] = [];

  isTableSelected: boolean = false;

  selectedTableId: number | null = null;

  disabledButtons: { [key: number]: boolean } = {};

  order: Order;
  private orderSubscription: Subscription;

  constructor(private dataStorageService: DataStorageService,
    private loaderService: LoaderService, private orderService: OrderService) {

    var retrievedObject = localStorage.getItem('cart');


    this.order = retrievedObject ? JSON.parse(retrievedObject) : {
      tableId: 0,
      orderNumber: "",
      amount: 0,
      phoneNumber: "",
      items: []
    };

    if (this.order.amount != 0) {

      this.selectedTableId = this.order.tableId;
      this.selectTable(this.selectedTableId);

    }

    // Subscribe to order changes
    this.orderSubscription = this.orderService.getOrder().subscribe(order => {
      this.order = order;
      this.updateDisabledButtons();

    });
  }


  ngOnInit(): void {
    this.loadTables(0, 10);
    this.loadFoods(0, 20);
  }




  loadTables(page: number, perPage: number): void {
    this.dataStorageService.getTables(page, perPage).pipe(this.loaderService.attachLoader()).subscribe(response => {
      this.tableData = response.data;
      console.log(this.tableData);
    });
  }

  loadFoods(page: number, perPage: number): void {
    this.dataStorageService.getFoods(page, perPage).subscribe(response => {
      this.foodData = response.data;
      console.log(this.foodData);

    });
  }

  selectTable(tableId: number): void {
    this.selectedTableId = tableId;
    if (!this.isTableSelected) {
      this.isTableSelected = !this.isTableSelected;
    }
    this.order.tableId = tableId;
    // console.log(tableId);
    this.orderService.setTableId(tableId)

  }

  addItem(selectedFood: any): void {
    const newItem: OrderItem = {
      foodId: selectedFood.id,
      foodPackageId: null,
      quantity: 1,
      unitPrice: selectedFood.discountType == "None" ? selectedFood.price : selectedFood.discountPrice,
      totalPrice: selectedFood.discountType == "None" ? selectedFood.price : selectedFood.discountPrice,
    };
    this.orderService.addItemToOrder(newItem, selectedFood);
    this.disabledButtons[selectedFood.id] = true;

  }

  private updateDisabledButtons(): void {
    // Enable all buttons initially
    Object.keys(this.disabledButtons).forEach(key => {
      this.disabledButtons[+key] = false;
    });

    // Disable buttons for items that are in the order
    this.order.items.forEach(item => {
      this.disabledButtons[item.foodId] = true;
    });
  }

}
