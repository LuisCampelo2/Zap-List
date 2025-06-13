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
  const [modalObservation, setModalObservation] = useState<number | null>(null);

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

  const openObservation = (productId: number) => {
    setModalObservation((prev) => (prev === productId ? null : productId));
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
                <div className="row">
                  <Link className="btn btn-all col-6" to="/products">
                    Adicionar Produto
                  </Link>
                  <div className="d-flex align-items-center col-6">
                    {filteredProducts.map((productItem) => 
                      modalObservation === productItem.id && (
                        <div className="alert alert-warning">
                          <i onClick={()=>setModalObservation(null)} className="bi bi-x-lg"></i>
                          {productItem.observation}
                        </div>
                      )
                    )}
                  </div>
                </div>
              <div className="card-body">
                <div className="row">
                  <ul
                    className="list-group mt-2 col-6"
                    style={{
                      width: "400px",
                      overflowY: "auto",
                      maxHeight: "590px",
                    }}
                  >
                    {filteredProducts.map((productItem) => (
                      <li
                        key={productItem.id}
                        className={
                          productItem.observation
                            ? "list-group-item bg-success d-flex align-items-center"
                            : "list-group-item d-flex align-items-center"
                        }
                      >
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
                        {productItem.observation && (
                          <button
                            onClick={() => openObservation(productItem.id)}
                            className="btn"
                          >
                            <i className="bi bi-envelope"></i>
                          </button>
                        )}
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
          </div>
        </>
      )}
    </>
  );
};
