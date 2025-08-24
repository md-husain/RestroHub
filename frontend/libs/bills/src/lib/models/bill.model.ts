export interface Cart {
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Bill {
  name: string;
  email: string;
  phoneNumber: string;
  total: number;
  uuid?: string;
  paymentMethod: string;
  productDetails: string;
  cartItems?: Cart[];
  createdBy: string;
}
