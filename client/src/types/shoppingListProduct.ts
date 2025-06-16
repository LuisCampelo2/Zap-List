import type { Product } from "./product";

export interface ShoppingListProducts{
  id: number;
  name: string;
  quantity: number | null;
  isChecked: boolean;
  shoppingListId: number | null;
  productId: number | null;
  observation: string | null;
  photo: string;
  Product: Product;
}