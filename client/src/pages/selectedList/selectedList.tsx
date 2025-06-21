import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { type ShoppingListProducts } from "../../types/shoppingListProduct";
import axios from "axios";
import { ProductsFilter } from "../../components/productsFilter";
import { ModalConfirmationProduct } from "../../components/modalConfirmationDeleteProduct";
import { type ShoppingList } from "../../types/shoppingList";

export const SelectedList = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<ShoppingListProducts[]>([]);
  const [list, setList] = useState<ShoppingList | null>(null);
  const [options, setOptions] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [modalDelete, setModalDelete] = useState(false);
  const [modalObservation, setModalObservation] = useState<number | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [filters, setFilters] = useState({ name: "", category: "" });
  const [originalProducts, setOriginalProducts] = useState<
    ShoppingListProducts[]
  >([]);
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
        setProducts(response.data.products);
        setList(response.data.updatedList);
        if (filters.name === "" && filters.category === "") {
          setOriginalProducts(response.data);
        }
        console.log("Dados recebidos:", response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingSearch(false);
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
    setModalDelete(true);
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
      {products.length === 0 && <h1>Sem resultados</h1>}
      {modalDelete && (
        <ModalConfirmationProduct
          shoppingProductId={selectedProductId}
          onClose={() => setModalDelete(false)}
        />
      )}
      {originalProducts.length === 0 && (
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
      )}
      ;
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
      <>
        <ProductsFilter
          nameFilter={nameInput}
          categoryFilter={filters.category}
          onFilterChange={handleFilterChange}
          loading={loadingSearch}
        />
        <div className="d-flex justify-content-center">
          <h1>Preço Estimado: R$ {list?.totalPrice}</h1>
        </div>

        <div className="table-responsive">
          <table className="table border container" style={{ width: "30%" }}>
            <thead>
              <tr>
                <th style={{ width: "5%" }}>-</th>
                <th style={{ width: "5%" }}>-</th>
                <th style={{ width: "5%" }}>Nome</th>
                <th style={{ width: "5%" }}>Qntd/Peso</th>
                <th style={{ width: "5%" }}>Opções</th>
              </tr>
            </thead>
            <tbody>
              {products.map((productItem) => (
                <>
                  <tr
                    key={productItem.id}
                    className={productItem.observation ? "observation" : ""}
                  >
                    <td>
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        id={`product-${productItem.id}`}
                        checked={productItem.isChecked}
                        onChange={() =>
                          handleCheckboxChange(
                            productItem.id,
                            productItem.isChecked
                          )
                        }
                      />
                    </td>
                    <td>
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
                    </td>
                    <td>
                      <label
                        className="form-check-label"
                        htmlFor={`product-${productItem.id}`}
                      >
                        {productItem.Product.name}
                      </label>
                    </td>
                    <td>
                      <strong>{productItem.quantity}</strong>
                    </td>
                    <td>
                      <i
                        onClick={() =>
                          setOptions((prev) =>
                            prev === productItem.id ? null : productItem.id
                          )
                        }
                        className="bi bi-three-dots-vertical"
                      ></i>
                      {options === productItem.id && (
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ gap: "2px" }}
                        >
                          {productItem.observation && (
                            <button
                              onClick={() => openObservation(productItem.id)}
                              className="btn btn-primary"
                            >
                              <i className="bi bi-envelope"></i>
                            </button>
                          )}
                          <button className="btn btn-danger">
                            <i
                              onClick={() => handleDelete(productItem.id)}
                              className="bi bi-trash"
                            ></i>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
};
