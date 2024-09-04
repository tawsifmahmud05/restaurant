import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { LoaderService } from '../shared/loader.service';
import { Employee } from '../employees/employee.model';
import { Table } from '../tables/table.model';
import { Food } from '../foods/food.model';
import { Order } from '../orders/order.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  employees: Employee[] = [];
  tables: Table[] = [];
  foods: Food[] = [];
  orders: Order[] = [];

  constructor(private dataStorageService: DataStorageService,
    private loaderService: LoaderService,) { }


  ngOnInit() {
    // this.dataStorageService.getEmployees().subscribe(data => {
    //   this.dataSource = data.data;
    // });
    this.loadData();

  }

  loadData(): void {
    this.dataStorageService.getAllEmployees().subscribe(response => {
      this.employees = response;
    });
    this.dataStorageService.getAllTables().subscribe(response => {
      this.tables = response;
    });
    this.dataStorageService.getAllFoods().subscribe(response => {
      this.foods = response;
    });
    this.dataStorageService.getAllOrders().subscribe(response => {
      this.orders = response;
    });

  }

}
