enum Category {
  MaterialDeHigiene = "Material de higiene",
  MaterialDeLimpeza = "Material de limpeza",
  Frutas = "Frutas",
  Carne = "Carne",
  Outros = "Outros",
}

export interface Product {
  name: string;
  photo: string;
  category: Category;
}
