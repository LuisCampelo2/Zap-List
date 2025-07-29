import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { type ShoppingListProducts } from "../../types/shoppingListProduct";
import axios from "axios";
import { ProductsFilter } from "../../components/productsFilter";
import { ModalConfirmationProduct } from "../../components/modalConfirmationDeleteProduct";
import { type ShoppingList } from "../../types/shoppingList";
import { ModalOptions } from "../../components/modalOptions";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalFilter, setModalFilter] = useState(false);

  useEffect(() => {
    setLoadingSearch(true);
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/list/${id}/productsList`,
          {
            params: {
              name: filters.name.trim() || undefined,
              category: filters.category || undefined,
              page,
              limit: 10,
            },
            withCredentials: true,
          }
        );
        setTotalPages(response.data.totalPages);
        setProducts(response.data.products);
        setList(response.data.updatedList);
        if (filters.name === "" && filters.category === "") {
          setOriginalProducts(response.data.products);
        }
        console.log("Dados recebidos:", response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingSearch(false);
      }
    };
    fetchProdutos();
  }, [page, filters, id]);

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

  const handleModalOptions = (productItem: number) => {
    setOptions((prev) => (prev === productItem ? null : productItem));
  };

  return (
    <>
      {modalDelete && (
        <ModalConfirmationProduct
          shoppingProductId={selectedProductId}
          onClose={() => setModalDelete(false)}
        />
      )}
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
        {modalFilter && (
          <ProductsFilter
            nameFilter={nameInput}
            categoryFilter={filters.category}
            onFilterChange={handleFilterChange}
            loading={loadingSearch}
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
                  <Link className="btn btn-all" to={`/products?listId=${id}`}>
                    Adicionar Produto
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : products.length === 0 ? (
          <h1>Sem resultados</h1>
        ) : (
          <>
            <div className="container d-flex gap-3 flex-column me-5">
              <h1 className="mb-0">Preço Estimado: R$ {list?.totalPrice}</h1>
              <div>
                <button
                  onClick={() => setModalFilter((prev) => !prev)}
                  className="d-flex align-items-center button-filter"
                >
                  <i className="bi bi-sliders me-2"></i>
                  <p className="mb-0">Buscar Produto</p>
                </button>
                <Link to={`/products?listId=${id}`} className="btn btn-all">
                  <i className="bi bi-cart-plus"></i>Adicionar Produto
                </Link>
              </div>
            </div>
            <div className="table-responsive">
              <table
                className="table border container"
                style={{ width: "30%" }}
              >
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
                          <strong>
                            {productItem.quantity}
                            {["Carnes", "Peixes"].includes(
                              productItem.Product.category
                            )
                              ? " KG"
                              : " Unidade(s)"}
                          </strong>
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
                            <ModalOptions
                              productId={productItem.id}
                              handleDelete={() => handleDelete(productItem.id)}
                              handleObservation={() =>
                                openObservation(productItem.id)
                              }
                              onClose={() => handleModalOptions(productItem.id)}
                            />
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="card-footer">
                <nav aria-label="...">
                  <ul className="pagination d-flex justify-content-center">
                    {page !== 1 && (
                      <li>
                        <a
                          className="page-link"
                          onClick={() => setPage(page - 1)}
                        >
                          Voltar
                        </a>
                      </li>
                    )}
                    <li className={`page-item ${page === 1 ? "active" : ""}`}>
                      <a className="page-link" onClick={() => setPage(1)}>
                        1
                      </a>
                    </li>
                    <li className={`page-item ${page === 2 ? "active" : ""}`}>
                      <a
                        className="page-link"
                        onClick={() => setPage(2)}
                        aria-current="page"
                      >
                        2
                      </a>
                    </li>
                    <li className={`page-item ${page === 3 ? "active" : ""}`}>
                      <a className="page-link" onClick={() => setPage(3)}>
                        3
                      </a>
                    </li>
                    {page !== totalPages && (
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={() => setPage(page + 1)}
                        >
                          Próxima
                        </a>
                      </li>
                    )}
                    <li>
                      {" "}
                      <span>
                        Página {page} de {totalPages}
                      </span>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
      </>
    </>
  );
};
