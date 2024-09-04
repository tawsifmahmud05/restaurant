import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order, OrderItem } from './order.model';  // Adjust the import path as needed
import { Food } from '../foods/food.model';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private orderSubject: BehaviorSubject<Order>;
    private foodSubject: BehaviorSubject<Food[]>;
    private cartObject = localStorage.getItem('cart');
    private foodListObject = localStorage.getItem('cart-food-list');


    private order = this.cartObject ? JSON.parse(this.cartObject) : {
        tableId: 0,
        orderNumber: "",
        amount: 0,
        phoneNumber: "",
        items: []
    };
    private foodList = this.foodListObject ? JSON.parse(this.foodListObject) : [];


    constructor() {
        const initialOrder: Order = this.order;
        this.orderSubject = new BehaviorSubject<Order>(initialOrder);

        const initialFoods: Food[] = this.foodList;
        this.foodSubject = new BehaviorSubject<Food[]>(initialFoods);
    }

    setTableId(tableId: number): void {
        const currentOrder = this.orderSubject.value;
        currentOrder.tableId = tableId;
        localStorage.setItem('cart', JSON.stringify(currentOrder));
        this.orderSubject.next(currentOrder);
    }

    getOrder(): Observable<Order> {
        return this.orderSubject.asObservable();
    }

    getOrderFoods(): Observable<Food[]> {
        return this.foodSubject.asObservable();
    }

    setOrder(order: Order): void {
        this.orderSubject.next(order);
    }

    addItemToOrder(item: OrderItem, food: Food): void {
        const currentOrder = this.orderSubject.value;
        currentOrder.items.push(item);
        currentOrder.amount += item.totalPrice;
        localStorage.setItem('cart', JSON.stringify(currentOrder));

        this.orderSubject.next(currentOrder);

        const currentfoodlist = this.foodSubject.value;
        currentfoodlist.push(food);
        localStorage.setItem('cart-food-list', JSON.stringify(currentfoodlist));
        this.foodSubject.next(currentfoodlist);
        console.log(currentfoodlist);

        this.calculateTotalAmount(currentOrder.items)


    }

    removeItemFromOrder(itemId: number): void {
        const currentOrder = this.orderSubject.value;
        const itemIndex = currentOrder.items.findIndex(item => item.foodId === itemId);
        if (itemIndex > -1) {
            currentOrder.amount -= currentOrder.items[itemIndex].totalPrice;
            currentOrder.items.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(currentOrder));

            this.orderSubject.next(currentOrder);

            const currentFoodList = this.foodSubject.value;
            const foodIndex = currentFoodList.findIndex(food => food.id === itemId);
            if (foodIndex > -1) {
                currentFoodList.splice(foodIndex, 1);
                localStorage.setItem('cart-food-list', JSON.stringify(currentFoodList));

                this.foodSubject.next(currentFoodList);
            }
        }
        this.calculateTotalAmount(currentOrder.items)
    }

    calculateTotalAmount(items: OrderItem[]) {
        const currentOrder = this.orderSubject.value;
        currentOrder.amount = items.reduce((sum, item) => sum + item.totalPrice, 0);
        localStorage.setItem('cart', JSON.stringify(currentOrder));

        this.orderSubject.next(currentOrder);
    }

    addItemQuantity(foodId: number) {
        // var currentOrder = this.orderSubject.value;
        // console.log(currentOrder, "add");
        const currentOrder = this.orderSubject.value;
        const item = currentOrder.items.find(item => item.foodId === foodId);
        if (item) {

            item.quantity = item.quantity + 1;
            item.totalPrice = item.unitPrice * item.quantity;
            localStorage.setItem('cart', JSON.stringify(currentOrder));

            this.orderSubject.next(currentOrder);
            this.calculateTotalAmount(currentOrder.items);

        }

    }
    removeItemQuantity(foodId: number) {
        // var currentOrder = this.orderSubject.value;
        // console.log(currentOrder, "add");
        const currentOrder = this.orderSubject.value;
        const item = currentOrder.items.find(item => item.foodId === foodId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity = item.quantity - 1;
                item.totalPrice = item.unitPrice * item.quantity;
                localStorage.setItem('cart', JSON.stringify(currentOrder));

                this.orderSubject.next(currentOrder);
                this.calculateTotalAmount(currentOrder.items);
            }

        }

    }

    setOrderNumber(orderNumber: string) {
        const currentOrder = this.orderSubject.value;
        currentOrder.orderNumber = orderNumber;
        currentOrder.phoneNumber = null;
        localStorage.setItem('cart', JSON.stringify(currentOrder));

        this.orderSubject.next(currentOrder);
    }

    removeOrder() {
        var currentOrder = this.orderSubject.value;
        const initialOrder: Order = {
            tableId: 0,
            orderNumber: '',
            amount: 0,
            phoneNumber: '',
            items: []
        };
        currentOrder = initialOrder;
        localStorage.removeItem('cart');
        // localStorage.setItem('cart', JSON.stringify(currentOrder));
        this.orderSubject.next(currentOrder);
    }
    removeFoods() {
        var currentFood = this.foodSubject.value;
        const initialFoods: Food[] = [];
        currentFood = initialFoods;
        localStorage.removeItem('cart-food-list');
        this.foodSubject.next(currentFood);
    }



}
