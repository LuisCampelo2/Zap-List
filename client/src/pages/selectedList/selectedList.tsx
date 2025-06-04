import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { type Product } from "../../types/product";
import axios from "axios";
import { ProductsFilter } from "../../components/productsFilter";
import { useSearchParams } from "react-router-dom";

export const SelectedList = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const nameFilter = searchParams.get("name");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/list/${id}/productsList`, {
          withCredentials:true
        });
        setProducts(response.data);
        console.log("Dados recebidos:", response.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchProdutos();
  }, [id]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = categoryFilter
      ? p.Product.category === categoryFilter
      : true;
    const matchesName = nameFilter
      ? p.Product.name.toLowerCase().includes(nameFilter.toLowerCase())
      : true;
    return matchesCategory && matchesName;
  });

  const toggleSelection = (productId: number) => {
    setSelectedProductIds((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  return (
    <>
      <ProductsFilter />
      <ul className="list-group">
        {filteredProducts.map((productItem) => (
          <li key={productItem.id} className="list-group-item">
            <input
              className="form-check-input me-1"
              type="checkbox"
              name="listGroupRadio"
              id={`product-${productItem.id}`}
              onChange={() => toggleSelection(productItem.id)}
              checked={selectedProductIds.includes(productItem.id)}
            />
            <img
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={`${import.meta.env.VITE_API_URL}/imgs/${
                productItem.Product.photo
              }`}
              alt=""
            />
            <label
              className="form-check-label"
              htmlFor={`product-${productItem.id}`}
            >
              {productItem.Product.name}
            </label>{" "}
            <strong>Qntd:{productItem.quantity}</strong>
          </li>
        ))}
      </ul>
    </>
  );
};
