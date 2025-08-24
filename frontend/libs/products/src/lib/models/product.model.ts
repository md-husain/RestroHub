import { Category } from '@frontend/utilities';

export interface Product {
  _id?: string;
  name?: string;
  category?: Category;
  categoryId?: string;
  description?: string;
  price?: number;
  status: boolean;
}
