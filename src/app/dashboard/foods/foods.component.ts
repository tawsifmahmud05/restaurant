import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css'
})
export class FoodsComponent {
  constructor(private dialog: MatDialog, private loaderService: LoaderService) { }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().pipe(this.loaderService.attachLoader()).subscribe(result => {
      if (result) {
        // User clicked Proceed
        console.log('Proceed');
      } else {
        // User clicked Cancel or clicked outside the dialog
        console.log('Cancelled');
      }
    });
  }
}
