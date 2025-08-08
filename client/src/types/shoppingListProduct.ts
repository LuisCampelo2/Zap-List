import type { Product } from "./product";
import type { ShoppingList } from "./shoppingList";

export interface ShoppingListProducts{
  id: number;
  quantity: number | null;
  isChecked: boolean;
  shoppingListId: number;
  productId: number;
  observation?: string | null;
  Product: Product;
  ShoppingList: ShoppingList;
}