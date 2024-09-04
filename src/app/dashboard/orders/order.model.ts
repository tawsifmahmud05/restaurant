export interface Order {
    id: string;
    orderNumber: string;
    amount: number;
    orderStatus: string;
    orderTime: string;
    table: Table;
    orderedBy: any;
    orderTakenBy: any;
    orderItems: OrderItem[];
}

export interface Table {
    id: number;
    tableNumber: string;
    numberOfSeats: number;
    isOccupied: boolean;
    image: string;
    employees: any;
}

export interface OrderItem {
    id: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    food: Food;
    foodPackage: any;
}

export interface Food {
    id: number;
    name: string;
    description: string | null;
    price: number;
    discountType: string | null;
    discount: number;
    discountPrice: number;
    image: string;
}
