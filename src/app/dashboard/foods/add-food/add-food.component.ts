import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';
import { LoaderService } from '../../shared/loader.service';
import { NotificationService } from '../../shared/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrl: './add-food.component.css'
})
export class AddFoodComponent {

  imageSelected: boolean = false;

  food = {
    name: "",
    description: "",
    price: 0,
    discountType: 0,
    discount: 0,
    discountPrice: 0,
    image: "",
    base64: "aGVsbG8gd29ybGQ="
  };

  constructor(private dataStorageService: DataStorageService,
    private router: Router, private loaderService: LoaderService,
    private notificationService: NotificationService) {

  }
  ngOnInit(): void {

  }


  discountedPrice() {
    if (this.food.price < 0) {
      this.food.price = 0;
    }

    if (this.food.discount < 0) {
      this.food.discount = 0;
    }


    if (this.food.discountType == 1) {
      this.food.discountPrice = this.food.price - this.food.discount;
    } else if (this.food.discountType == 2) {
      this.food.discountPrice = this.food.price - (this.food.price * this.food.discount / 100);
    } else {
      this.food.discountPrice = this.food.price;
    }

    if (this.food.discountPrice < 0) {
      this.food.discountPrice = 0;
    }
  }

  onSubmit(form: NgForm) {
    console.log(this.food);

    if (form.valid) {
      this.dataStorageService.addFood(this.food).pipe(this.loaderService.attachLoader()).subscribe(
        response => {
          console.log('Food added successfully', response);
          this.notificationService.showSuccess("Food Added successfully")

          this.router.navigate(['dashboard/foods']);
        },
        error => {
          this.loaderService.hideLoader();
          console.error('Error adding food', error);
          this.notificationService.showError("Please try again!")

        }
      );
    }
  }

  toggleSelect(): void {
    this.imageSelected = !this.imageSelected;

    if (this.imageSelected == false) {
      this.food.image = ""
      this.food.base64 = ""
    }
  }

  onFileSelected(event: Event): void {
    this.toggleSelect();
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.food.base64 = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
}
