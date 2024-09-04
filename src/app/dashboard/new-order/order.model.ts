export interface OrderItem {
    foodId: number;
    foodPackageId: number | null;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Order {
    tableId: number;
    orderNumber: string;
    amount: number;
    phoneNumber: string | null;
    items: OrderItem[];
}