import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductsFilter } from "../components/productsFilter";
import { ModalConfirmationProduct } from "../components/modalConfirmationDeleteProduct";
import { ModalOptions } from "../components/modalOptions";
import { type RootState, type AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsList, checkBoxChange } from "../slices/listProductsSlice";
import { setPage } from "../slices/listProductsSlice";

export const SelectedList = () => {
  const { id } = useParams();

  const [options, setOptions] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [modalDelete, setModalDelete] = useState(false);
  const [modalObservation, setModalObservation] = useState<number | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [filters, setFilters] = useState({ name: "", category: "" });
  const products = useSelector(
    (state: RootState) => state.listProduct.products
  );
  const loading = useSelector((state: RootState) => state.listProduct.loading);
  const list = useSelector((state: RootState) => state.listProduct.list);
  const page = useSelector((state: RootState) => state.listProduct.page);
  const totalPages = useSelector(
    (state: RootState) => state.listProduct.totalPages
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProductsList({ id: Number(id), filters, page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, id, dispatch]);

  const filteredProducts = products.filter((item) =>
    item.Product.name.toLowerCase().includes(nameInput.toLowerCase())
  );

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
        {products.length === 0 && (
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
        )}
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h1 className="col-12">Preço Estimado: R$ {list?.totalPrice}</h1>
              <Link to={`/products?listId=${id}`} className="btn btn-all">
                <i className="bi bi-cart-plus"></i>Adicionar Produto
              </Link>
              <div className="row">
                <input
                  id="nameInput"
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Buscar produto..."
                />
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-container"
                  style={{ width: "30%" }}
                >
                  <tbody>
                    {filteredProducts.map((productItem) => (
                      <>
                        <tr
                          key={productItem.id}
                          className={
                            productItem.observation ? "observation" : ""
                          }
                        >
                          <td>
                            <input
                              className={
                                productItem.isChecked ? "bg-success-subtle" : ""
                              }
                              type="checkbox"
                              id={`product-${productItem.id}`}
                              checked={productItem.isChecked}
                              onChange={() =>
                                dispatch(
                                  checkBoxChange({
                                    id: productItem.id,
                                    isChecked: productItem.isChecked,
                                  })
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
                                  prev === productItem.id
                                    ? null
                                    : productItem.id
                                )
                              }
                              className="bi bi-three-dots-vertical"
                            ></i>
                            {options === productItem.id &&
                              !modalObservation &&
                              !modalDelete && (
                                <ModalOptions
                                  productId={productItem.id}
                                  product={productItem}
                                  handleDelete={() =>
                                    handleDelete(productItem.id)
                                  }
                                  handleObservation={() =>
                                    openObservation(productItem.id)
                                  }
                                  onClose={() =>
                                    handleModalOptions(productItem.id)
                                  }
                                />
                              )}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {totalPages > 1 && (
              <div className="card-footer">
                <nav aria-label="...">
                  <ul className="pagination d-flex justify-content-center">
                    {page !== 1 && (
                      <li>
                        <a
                          className="page-link"
                          onClick={() => dispatch(setPage(page - 1))}
                        >
                          Voltar
                        </a>
                      </li>
                    )}
                    <li className={`page-item ${page === 1 ? "active" : ""}`}>
                      <a
                        className="page-link"
                        onClick={() => dispatch(setPage(1))}
                      >
                        1
                      </a>
                    </li>
                    <li className={`page-item ${page === 2 ? "active" : ""}`}>
                      <a
                        className="page-link"
                        onClick={() => dispatch(setPage(2))}
                        aria-current="page"
                      >
                        2
                      </a>
                    </li>
                    <li className={`page-item ${page === 3 ? "active" : ""}`}>
                      <a
                        className="page-link"
                        onClick={() => dispatch(setPage(3))}
                      >
                        3
                      </a>
                    </li>
                    {page !== totalPages && (
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={() => dispatch(setPage(page + 1))}
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
          </div>
        </div>
      </>
    </>
  );
};
