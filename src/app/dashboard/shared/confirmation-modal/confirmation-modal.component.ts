import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationModalComponent>) { }

  onCloseClick(): void {
    this.dialogRef.close(false); // Close the dialog and return false
  }
}
