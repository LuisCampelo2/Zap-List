export type Category =
  | "Material de higiene"
  | "Material de limpeza"
  | "Frutas"
  | "Carne"
  | "Outros";

export interface Product {
  id: number;
  name: string;
  photo: string;
  category: string;
  quantity: number;
  isChecked: boolean;
}
