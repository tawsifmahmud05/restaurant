import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { TablesComponent } from './dashboard/tables/tables.component';
import { FoodsComponent } from './dashboard/foods/foods.component';
import { NewOrderComponent } from './dashboard/new-order/new-order.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';

import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { EmployeeTableComponent } from './dashboard/employees/employee-table/employee-table.component';
import { FoodTableComponent } from './dashboard/foods/food-table/food-table.component';
import { TableTableComponent } from './dashboard/tables/table-table/table-table.component';
import { AddEmployeeComponent } from './dashboard/employees/add-employee/add-employee.component';
import { AddTableComponent } from './dashboard/tables/add-table/add-table.component';
import { AddFoodComponent } from './dashboard/foods/add-food/add-food.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { NotificationComponent } from './dashboard/shared/notification/notification.component';
import { MatDialogActions, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './dashboard/shared/confirmation-modal/confirmation-modal.component';
import { CardComponent } from './dashboard/shared/card/card.component';
import { CartComponent } from './dashboard/cart/cart.component';
import { AssignModalComponent } from './dashboard/tables/assign-modal/assign-modal.component';
import { InfoCardComponent } from './dashboard/admin/info-card/info-card.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    AdminComponent,
    EmployeesComponent,
    TablesComponent,
    FoodsComponent,
    NewOrderComponent,
    OrdersComponent,
    BarChartComponent,
    EmployeeTableComponent,
    FoodTableComponent,
    TableTableComponent,
    NotificationComponent,
    ConfirmationModalComponent,
    CardComponent,
    AddEmployeeComponent,
    AddTableComponent,
    AddFoodComponent,
    CartComponent,
    AssignModalComponent,
    InfoCardComponent,
  ],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BaseChartDirective,
    BrowserAnimationsModule,
    CommonModule,
    CdkTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule
  ],

})
export class AppModule { }
