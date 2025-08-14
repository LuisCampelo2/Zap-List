import { useEffect, useState } from "react";
import { type Product } from "../types/product";
import { AddProductToShoppingList } from "../components/addProductToShoppingList";
import { fetchProducts } from "../slices/productsSlice";
import { useLocation } from "react-router-dom";
import { type RootState, type AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../slices/productsSlice";
import { ProductsFilter } from "../components/productsFilter";

export const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addProductModal, setAddProductModal] = useState(false);
  const products = useSelector((state: RootState) => state.products.products);
  const [nameInput, setNameInput] = useState("");
  const productInList = useSelector(
    (state: RootState) => state.products.productInList
  );
  const page = useSelector((state: RootState) => state.products.page);
  const search = useSelector((state: RootState) => state.products.search);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const listId = params.get("listId");
  const limitProducts = 20;
  const dispatch = useDispatch<AppDispatch>();

  const normalizedString = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase();
  };

  const filteredProducts = products.filter(
    (item) =>
      normalizedString(item.name).includes(normalizedString(nameInput)) ||
      normalizedString(item.category).includes(normalizedString(nameInput))
  );
  const totalPages = Math.ceil(filteredProducts.length / limitProducts);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limitProducts,
    page * limitProducts
  );

  useEffect(() => {
    dispatch(
      fetchProducts({
        listId: Number(listId),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPage(1));
    setNameInput(e.target.value);
  };

  const handleAddProductModal = (product: Product) => {
    setSelectedProduct(product);
    setAddProductModal(true);
  };

  return (
    <>
      {addProductModal && selectedProduct && (
        <AddProductToShoppingList
          product={selectedProduct}
          onClose={() => setAddProductModal(false)}
        />
      )}
      {search && (
        <ProductsFilter
          nameInput={nameInput}
          handleSearch={handleSearch}
        />
      )}
      <>
        <div className="container">
          <div className="row">
            <a
              href="#"
              className="upHeaderPage"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <i className="bi bi-arrow-up"></i>
            </a>

            {paginatedProducts.map((productItem, index) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                <div className="card">
                  <div className="card-header">
                    <img
                      style={{
                        width: "100%",
                        height: "214px",
                        objectPosition: "center",
                      }}
                      src={`${import.meta.env.VITE_API_URL}/imgs/${
                        productItem.photo
                      }`}
                      className="card-img-top"
                      alt={productItem.name}
                    />
                  </div>
                  <div className="card-body">
                    {productInList &&
                      productInList.includes(productItem.id) && (
                        <div className="alert alert-success">
                          Produto já adicionado a lista
                        </div>
                      )}
                    <h5 className="card-title">{productItem.name}</h5>
                    <p className="card-text">
                      Categoria: <strong>{productItem.category}</strong>
                    </p>
                    <p>
                      <strong>
                        Preço: R${productItem.price} por{" "}
                        {productItem.unitOFMeasure}
                      </strong>
                      <p>Preços podem varias por marca.</p>
                    </p>
                    <button
                      className="btn btn-all"
                      onClick={() => handleAddProductModal(productItem)}
                    >
                      Adicionar a lista
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
      </>
    </>
  );
};
