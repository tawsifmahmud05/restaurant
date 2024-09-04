import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { LoaderService } from '../shared/loader.service';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  constructor(private dataStoragerService: DataStorageService, private loaderService: LoaderService) {

  }

  ngOnInit(): void {


  }
}
