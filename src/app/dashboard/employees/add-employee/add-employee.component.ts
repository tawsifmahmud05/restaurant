import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../shared/loader.service';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  imageSelected: boolean = false;



  employeeId: string | null = null;

  employee = {
    designation: "Junior",
    joinDate: "2024-07-01T12:05:24.948Z",
    email: "john.de@example.com",
    phoneNumber: "91239367890",
    firstName: "John",
    middleName: "Michael",
    lastName: "Doe",
    fatherName: "Michael Doe",
    motherName: "Mary Doe",
    spouseName: "Jane Doe",
    dob: "1990-01-01T00:00:00Z",
    nid: "1234569018",
    genderId: 1,
    image: "path/to/image.jpg",
    base64: "aGVsbG8gd29ybGQ="
  };

  constructor(private dataStorageService: DataStorageService,
    private router: Router, private loaderService: LoaderService,
    private notificationService: NotificationService) {

  }
  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    console.log(this.employee);

    if (form.valid) {
      this.dataStorageService.addEmployee(this.employee).pipe(this.loaderService.attachLoader()).subscribe(
        response => {
          console.log('Employee added successfully', response);
          this.notificationService.showSuccess("Employee Added successfully")

          this.router.navigate(['dashboard/employees']);
        },
        error => {
          this.loaderService.hideLoader();
          console.error('Error adding employee', error);
          this.notificationService.showError("Please try again!")

        }
      );
    }
  }

  toggleSelect(): void {
    this.imageSelected = !this.imageSelected;
    if (this.imageSelected == false) {
      this.employee.image = ""
      this.employee.base64 = ""

    }

  }

  onFileSelected(event: Event): void {
    this.toggleSelect();
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.employee.base64 = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

}