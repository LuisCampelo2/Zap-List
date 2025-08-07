import type { Product } from "./product";
import type { ShoppingList } from "./shoppingList";

export interface ShoppingListProducts{
  id: number;
  name: ShoppingList["name"];
  quantity: number | null;
  isChecked: boolean;
  shoppingListId: ShoppingList["id"]
  productId: Product["id"];
  observation: string | null;
  photo: Product["photo"];
  Product: Product;
}