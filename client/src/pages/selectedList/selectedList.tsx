import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { type Product } from "../../types/product";
import axios from "axios";
import { ProductsFilter } from "../../components/productsFilter";
import { useSearchParams } from "react-router-dom";
import { ModalConfirmationProduct } from "../../components/modalConfirmationDeleteProduct";

export const SelectedList = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const nameFilter = searchParams.get("name");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const listId = Number(id);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/list/${id}/productsList`,
          {
            withCredentials: true,
          }
        );
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

  const handleDelete = (productId: number) => {
    setSelectedProductId(productId);
    setModalConfirmation(true);
  };

  return (
    <>
      {modalConfirmation && (
        <ModalConfirmationProduct
          productId={selectedProductId}
          listId={listId}
          onClose={() => setModalConfirmation(false)}
        />
      )}
      {products.length === 0 ? (
        <>
          <div className="container">
            <div className="card">
              <div className="card-header">
                <h1>Esta lista está vazia</h1>
              </div>
              <div className="card-body d-flex justify-content-center">
                <Link className="btn btn-all" to="/products">
                  Adicionar Produto
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <ProductsFilter />
          <div className="container d-flex justify-content-center">
            <div className="card">
              <div className="card-body">
                <Link className="btn btn-all" to="/products">
                  Adicionar Produto
                  </Link>
                  
                   <ul
                className="list-group mt-2"
                style={{
                  width: "300px",
                  overflowY: "auto",
                  maxHeight: "700px",
                }}
              >
                {filteredProducts.map((productItem) => (
                  <li
                    key={productItem.id}
                    className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      name="listGroupRadio"
                      id={`product-${productItem.id}`}
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
                    <i
                      onClick={() => handleDelete(productItem.Product.id)}
                      className="bi bi-trash"
                    ></i>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
