import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Table } from '../table.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataStorageService } from '../../shared/data-storage.service';
import { LoaderService } from '../../shared/loader.service';
import { NotificationService } from '../../shared/notification/notification.service';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AssignModalComponent } from '../assign-modal/assign-modal.component';

@Component({
  selector: 'app-table-table',
  templateUrl: './table-table.component.html',
  styleUrl: './table-table.component.css'
})
export class TableTableComponent {

  // displayedColumns: string[] = ['image', 'name', 'price', 'discountType', 'discount', 'discountPrice', 'action'];
  displayedColumns: string[] = ['tableNumber', 'numberOfSeats', 'isOccupied', 'employees', 'action'];
  // displayedColumns: string[] = ['tableNumber', 'numberOfSeats', 'isOccupied', 'employees'];
  dataSource = new MatTableDataSource<Table>([]);
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  isFoundData = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataStorageService: DataStorageService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.loadTables(this.currentPage, this.pageSize);

  }


  loadTables(page: number, perPage: number): void {
    this.dataStorageService.getTables(page, perPage).pipe(this.loaderService.attachLoader()).subscribe(response => {
      this.dataSource = response.data;
      this.totalRecords = response.totalRecords;
      this.isFoundData = true;

    },
      error => {
        this.notificationService.showError("Try again");
        this.loaderService.hideLoader();
      });
  }

  openConfirmationDialog(id: any): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDeleteEmployeeTable(id)
      } else {
        // User clicked Cancel or clicked outside the dialog
        console.log('Cancelled');
      }
    });
  }
  openAssignDialog(tableId: number, numberOfSeats: number, image: string): void {
    const dialogRef = this.dialog.open(AssignModalComponent, {
      // width: '50%',
      // height: '50%',
      data: { id: tableId, seat: numberOfSeats, img: image }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTables(this.currentPage, this.pageSize);
      } else {
        // User clicked Cancel or clicked outside the dialog
        console.log('Cancelled');
      }
    });
  }

  onDeleteEmployeeTable(id: any) {
    this.dataStorageService.deleteEmployeeTable(id).pipe(this.loaderService.attachLoader()).subscribe(
      response => {
        this.notificationService.showSuccess("Employee Removed successfully");
        this.loadTables(this.currentPage, this.pageSize);
      },
      error => {
        this.notificationService.showError("Try again");
        console.error('Error Removing Employee', error);
      }
    );
  }
  onDeleteTable(id: string) {
    this.dataStorageService.deleteTable(id).pipe(this.loaderService.attachLoader()).subscribe(
      response => {
        console.log('Table deleted', response);
        this.notificationService.showSuccess("Table deleted successfully");
        this.loadTables(this.currentPage, this.pageSize);
      },
      error => {
        this.notificationService.showError("Try again");
        console.error('Error deleting table', error);
      }
    );

  }
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadTables(this.currentPage, this.pageSize);
  }
}
