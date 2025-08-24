export interface DialogData {
  message?: string;
  id?: string;
}

export interface SuccessMsg {
  success: boolean;
  message: string;
  uuid?: string;
  billId?: string;
}

export interface Category {
  _id?: string;
  name: string;
}

export interface Cart {
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
}
