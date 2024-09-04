import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataStorageService } from '../../shared/data-storage.service';

interface EmployeeTable {
  employeeId: string;
  name: string;
}

interface RequestEmployeeTable {
  employeeId: string;
  tableId: number;
}

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.component.html',
  styleUrl: './assign-modal.component.css'
})


export class AssignModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AssignModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.loadNonAssignedEmployees(this.data.id);
  }


  assignedEmployees = new FormControl('');
  employeeList: EmployeeTable[] = [];



  onCloseClick(): void {
    this.dialogRef.close(false); // Close the dialog and return false
  }

  onProceedClick(): void {
    const employeeArray = this.assignedEmployees.value as unknown as any[];

    if (employeeArray) {
      const requestArray = employeeArray.map(assignedEmployee => ({
        employeeId: assignedEmployee.employeeId,
        tableId: this.data.id,
      }));
      this.dataStorageService.createRange(requestArray).subscribe(response => {
        console.log("Success");

      })
    }


    // });

  }

  loadNonAssignedEmployees(id: any): void {
    this.dataStorageService.getNonAssignedEmployee(id).subscribe(response => {
      this.employeeList = response;

    });
  }



}
