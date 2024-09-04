import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { LoaderService } from '../../shared/loader.service';
import { NotificationService } from '../../shared/notification/notification.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrl: './add-table.component.css'
})
export class AddTableComponent {

  imageSelected: boolean = false;


  table = {
    tableNumber: "TB002",
    numberOfSeats: 3,
    image: "path/to/image.jpg",
    base64: "aGVsbG8gd29ybGQ="
  };

  constructor(private dataStorageService: DataStorageService,
    private router: Router, private loaderService: LoaderService,
    private notificationService: NotificationService,
  ) {

  }
  ngOnInit(): void {

  }

  toggleSelect(): void {
    this.imageSelected = !this.imageSelected;

    if (this.imageSelected == false) {
      this.table.image = "";
      this.table.base64 = "";
    }
  }

  onFileSelected(event: Event): void {
    this.toggleSelect();
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.table.base64 = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }



  onSubmit(form: NgForm) {
    console.log(this.table);

    if (form.valid) {
      this.dataStorageService.addTable(this.table).pipe(this.loaderService.attachLoader()).subscribe(
        response => {
          console.log('Table added successfully', response);
          this.notificationService.showSuccess("Table Created successfully")

          this.router.navigate(['dashboard/tables']);
        },
        error => {
          this.loaderService.hideLoader();
          console.error('Error adding table', error);
          this.notificationService.showError("Please try again!")

        }
      );
    }
  }


}
