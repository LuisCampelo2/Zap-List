import { useEffect, useState } from "react";
import { type Product } from "../../types/product";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  function wait(delay: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  useEffect(() => {
    const fetchProdutos = async () => {
      await wait(400);
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos(); 
  }, []);
  return (
    <>
      <p>teste</p>
    </>
  );
};
