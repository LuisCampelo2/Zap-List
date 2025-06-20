export interface Product {
  id: number;
  name: string;
  photo: string;
  category: string;
  quantity: number;
  isChecked: boolean;
  Product: Product;
  observation: string | null;
  price: number | null;
}
