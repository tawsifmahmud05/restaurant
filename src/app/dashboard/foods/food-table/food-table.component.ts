import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { DataStorageService } from '../../shared/data-storage.service';
import { Food } from '../food.model';
import { LoaderService } from '../../shared/loader.service';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  selector: 'app-food-table',
  templateUrl: './food-table.component.html',
  styleUrl: './food-table.component.css'
})
export class FoodTableComponent implements OnInit, AfterViewInit {

  // displayedColumns: string[] = ['image', 'name', 'price', 'discountType', 'discount', 'discountPrice', 'action'];
  displayedColumns: string[] = ['image', 'name', 'price', 'discountType', 'discount', 'discountPrice', 'action'];
  dataSource = new MatTableDataSource<Food>([]);
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  isFoundData = false;
  isMobile: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataStorageService: DataStorageService, private loaderService: LoaderService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadFoods(this.currentPage, this.pageSize);
    this.isMobile = window.innerWidth <= 767; // Check if the screen width is 767px or less
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadFoods(page: number, perPage: number): void {
    this.dataStorageService.getFoods(page, perPage).pipe(this.loaderService.attachLoader()).subscribe(response => {
      this.dataSource = response.data;
      this.totalRecords = response.totalRecords;
      this.isFoundData = true;
    },
      error => {
        this.notificationService.showError("Try again");
        this.loaderService.hideLoader();
      });
  }

  onDeleteFood(id: any) {
    this.dataStorageService.deleteFood(id).pipe(this.loaderService.attachLoader()).subscribe(
      response => {
        this.notificationService.showSuccess("Food deleted successfully");
        this.loadFoods(this.currentPage, this.pageSize);
      },
      error => {
        this.notificationService.showError("Try again");
      }
    );

  }
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadFoods(this.currentPage, this.pageSize);
  }





}
