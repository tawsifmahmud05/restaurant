
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Employee } from '../employee.model';
import { DataStorageService } from '../../shared/data-storage.service';
import { LoaderService } from '../../shared/loader.service';
import { NotificationService } from '../../shared/notification/notification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'email', 'designation', 'joinDate', 'phone', 'action'];
  dataSource = new MatTableDataSource<Employee>([]);
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  isFoundData = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataStorageService: DataStorageService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private router: Router,) { }

  ngOnInit() {
    // this.dataStorageService.getEmployees().subscribe(data => {
    //   this.dataSource = data.data;
    // });
    this.loadEmployees(this.currentPage, this.pageSize);

  }
  loadEmployees(page: number, perPage: number): void {
    this.dataStorageService.getEmployees(page, perPage).pipe(this.loaderService.attachLoader()).subscribe(
      response => {
        this.dataSource = response.data;
        this.totalRecords = response.totalRecords;
        this.isFoundData = true;
      },
      error => {
        this.notificationService.showError("Try again");
        this.loaderService.hideLoader();
      });
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  onDelete(id: string) {
    this.dataStorageService.deleteEmployee(id).pipe(this.loaderService.attachLoader()).subscribe(
      response => {
        this.notificationService.showSuccess("Employee deleted successfully");
        this.loadEmployees(this.currentPage, this.pageSize);
      },
      error => {
        this.notificationService.showError("Try again");
      }
    );

  }


  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadEmployees(this.currentPage, this.pageSize);
  }


  // https://restaurantapi.bssoln.com/images/user/20-02-2024-10-58-12-9531685.jpg
}
