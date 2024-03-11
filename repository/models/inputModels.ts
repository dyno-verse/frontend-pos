export interface ICreateRequestDemo {
    fullName: string
    restaurantName: string
    phoneNumber: string
    email: string
}

{

}

export interface ICreateMenu {
    name: string
    description: string
    branchId: string
}


export interface ICreateCategory {
    name: string
    description: string
    color?: string
    branchId?: string
}

export interface ICreateCategoryItem {
    id: string,
    name: string;
    description: string;
    position: number;
    price: number;
    imageUrl?: string;
    ingredients: string[];
    branchId: string;
}

export interface IUpdateBusiness {
    name: string;
    slug: string;
    tag: string;
    primaryColor: string;
}
