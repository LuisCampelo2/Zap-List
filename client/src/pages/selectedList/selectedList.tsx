import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { type Product } from "../../types/product";
import axios from "axios";
import { ProductsFilter } from "../../components/productsFilter";
import { ModalConfirmationProduct } from "../../components/modalConfirmationDeleteProduct";

export const SelectedList = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const listId = Number(id);
  const [modalObservation, setModalObservation] = useState<number | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [filters, setFilters] = useState({ name: "", category: "" });
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    setLoadingSearch(true);
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/list/${id}/productsList`,
          {
            params: {
              name: filters.name || undefined,
              category: filters.category || undefined,
            },
            withCredentials: true,
          }
        );
        setProducts(response.data);

        if (filters.name === "" && filters.category === "") {
          setOriginalProducts(response.data);
        }
        console.log("Dados recebidos:", response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingSearch(false)
      }
    };
    fetchProdutos();
  }, [filters, id]);

  const handleFilterChange = (newFilters: {
    name: string;
    category: string;
  }) => {
    setFilters({
      name: newFilters.name,
      category: newFilters.category,
    });
    setNameInput(newFilters.name);
  };

  const handleDelete = (productId: number) => {
    setSelectedProductId(productId);
    setModalConfirmation(true);
  };

  const openObservation = (productId: number) => {
    setModalObservation((prev) => (prev === productId ? null : productId));
  };

  const handleCheckboxChange = async (
    id: number,
    currentIsChecked: boolean
  ) => {
    const newIsChecked = !currentIsChecked;

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isChecked: newIsChecked } : product
      )
    );

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/checked/${id}`,
        { isChecked: newIsChecked },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
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
      {originalProducts.length === 0 ? (
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
          {modalObservation && (
            <div className="container modal-observation">
              <div className="card card-observation">
                <div className="d-flex card-header observation-header">
                  <i
                    onClick={() => setModalObservation(null)}
                    className="bi bi-x-lg"
                  ></i>
                  Observações
                </div>
                <div className="card-body">
                  {products.map(
                    (productItem) =>
                      modalObservation === productItem.id && (
                        <div>{productItem.observation}</div>
                      )
                  )}
                </div>
              </div>
            </div>
          )}
          <ProductsFilter
            nameFilter={nameInput}
            categoryFilter={filters.category}
              onFilterChange={handleFilterChange}
              loading={loadingSearch}
          />
          <div className="container d-flex justify-content-center">
            <div className="card">
              <div className="row">
                <Link className="btn btn-all" to="/products">
                  Adicionar Produto
                </Link>
              </div>
              <div className="card-body">
                {products.length === 0 ? (
                  <h1>Sem resultados</h1>
                ) : (
                  <div className="row">
                    <ul
                      className="list-group mt-2 col-6"
                      style={{
                        width: "400px",
                        overflowY: "auto",
                        maxHeight: "400px",
                      }}
                    >
                      {products.map((productItem) => (
                        <li
                          key={productItem.id}
                          className={
                            productItem.observation
                              ? "list-group-item observation d-flex align-items-center"
                              : "list-group-item d-flex align-items-center"
                          }
                        >
                          <input
                            className="form-check-input me-1"
                            type="checkbox"
                            name="listGroupRadio"
                            id={`product-${productItem.id}`}
                            checked={productItem.isChecked}
                            onChange={() =>
                              handleCheckboxChange(
                                productItem.id,
                                productItem.isChecked
                              )
                            }
                          />
                          <img
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                            src={`${import.meta.env.VITE_API_URL}/imgs/${
                              productItem.photo
                            }`}
                            alt=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`product-${productItem.id}`}
                          >
                            {productItem.name}
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
                            onClick={() => handleDelete(productItem.id)}
                            className="bi bi-trash"
                          ></i>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
