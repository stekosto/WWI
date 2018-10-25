export interface Items {
    name: string,
    description: string,
    price: number,
    imagelink: string,
    rating: number,
    stock: number,
    category: string,
    subcategory: string;
}

export interface CartItems extends Items {
     quantity?: number,
     subtotal?: number;
}
