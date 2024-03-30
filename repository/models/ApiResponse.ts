export interface IBusinessInfo {
    id: string;
    name: string;
    slug: string;
    tag: string;
    primaryColor: string;
    phoneNumber: string;
    address: string;
    city: string;
    country: string;
    logoUrl: string;
    bannerUrl: string,
    createdAt: string;
    updatedAt: string;
    branches: Branch[];
}

interface Branch {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    phoneNumber: string;
    businessId: string;
    createdAt: string;
    updatedAt: string;
    menu: Menu[];
}

interface Menu {
    id: string;
}

export interface IMenuCategory {
    id: string
    name: string
    description: string
    color?: string
}

export interface IMenu {
    id: string
    name: string
    description: string
    color?: string
    price: number
    ingredients: string[]
    imageUrl: string
}

export interface IMenuDetail {
    id: string;
    name: string;
    description: string;
    branchId: string;
    createdAt: string;
    updatedAt: string;
    items: Item[];
    categories: Category[];
}

interface Category {
    id: string;
    name: string;
    description: string;
    parentId?: any;
    createdAt: string;
    updatedAt: string;
    color?: string;
    items: Item2[];
    children: any[];
}

interface Item2 {
    id: string;
    name: string;
    description: string;
    price: number;
    ingredients: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    color?: string;
    // @ts-ignore
    imageUrl?: string;
    ingredients: string[];
    createdAt: string;
    updatedAt: string;
}


export interface ICategoryItems {
    id: string;
    name: string;
    description: string;
    items: Item[];
    children: any[];
}

export interface Iitem {
    id: string;
    name: string;
    description: string;
    color?: string;
    price: number;
    quantity?: number;
    imageUrl?: string;
    ingredients: string[];
}


export interface IOrders {
    id: string
    branchId: string
    businessId: string
    orderNumber: number
    kitchenNote: string
    tableNumber: number
    orderItems: OrderItem[]
    feeItems: any[]
    subTotal: number
    total: number
    // @ts-ignore
    paymentType: string
    paymentStatus: string
    orderStatus: string
    serviceType: string
}

export interface OrderItem {
    item: Item
    quantity: number
    total: number
    kitchenStatus: string
}

export interface Item {
    id: string
    name: string
    description: string
    price: number
    ingredients: string[]
    imageUrl?: string
    color?: string
    createdAt: string
    updatedAt: string
}


// // @ts-ignore
// export interface Item {
//     id: string
//     name: string
//     description: string
//     price: number
//     // @ts-ignore
//     ingredients: any[]
//     // @ts-ignore
//     imageUrl: string
//     color?: string
//     createdAt: string
//     updatedAt: string
// }

export interface IKitchenStatus {
    kitchenStatus: string,
    itemIds: string[]
}

// NOT_STARTED,PREPARING,READY_TO_SERVE
export enum KitchenStatus {
    NOT_STARTED = 'NOT_STARTED',
    PREPARING = 'PREPARING',
    READY_TO_SERVE = 'READY_TO_SERVE',
    SERVED = 'SERVED'
}

export enum PaymentTypes {
    PAID = 'PAID',
    UNPAID = 'UNPAID',
}

export enum ServiceTypes {
    TAKE_OUT = 'TAKE_OUT',
    DINE_IN = 'DINE_IN'
}

export interface IOrder {
    businessId: string
    branchId: string
    kitchenNote: string
    tableNumber: number
    orderItems: IOrderItems[]
}

interface IOrderItems {
    itemId: string
    quantity: number
}

export interface IPayment {
    paymentType: string
    paymentStatus: string
    paymentReference?: string
}

