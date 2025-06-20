import type { Product } from "./product";
import type { ShoppingList } from "./shoppingList";

export interface ShoppingListProducts{
  id: number;
  name: string;
  quantity: number | null;
  isChecked: boolean;
  shoppingList: ShoppingList
  productId: number | null;
  observation: string | null;
  photo: string;
  Product: Product;
}