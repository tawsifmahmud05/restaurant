export interface Employee {
    employeeTableId: number;
    employeeId: string;
    name: string;
}

export interface Table {
    id: number;
    tableNumber: string;
    numberOfSeats: number;
    isOccupied: boolean;
    image: string;
    employees: Employee[];
}
