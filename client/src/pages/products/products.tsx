import { useEffect, useState } from "react";
import { type Product } from "../../types/product";
import { ProductsFilter } from "../../components/productsFilter";
import { Loader } from "../../components/loader";
import { AddProductToShoppingList } from "../../components/addProductToShoppingList";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addProductModal, setAddProductModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({ name: "", category: "" });
  const [nameInput, setNameInput] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [productInlist, setProductInList] = useState<number[]>([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const listId = params.get("listId");

  // function wait(delay: number) {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, delay);
  //   });
  // }

  useEffect(() => {
    const fetchProdutos = async () => {
      const isFirstLoad = loadingPage;
      if (isFirstLoad) setLoadingPage(true);
      setLoadingSearch(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`,
          {
            params: {
              name: filters.name || undefined,
              category: filters.category || undefined,
              listId: listId || undefined,
            },
            withCredentials: true,
          }
        );
        setProducts(res.data.products);
        setProductInList(res.data.productsInList);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoadingSearch(false);
        if (isFirstLoad) setLoadingPage(false);
      }
    };
    fetchProdutos();
  }, [filters, loadingPage, listId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((oldFilters) => ({
        ...oldFilters,
        name: nameInput,
      }));
    }, 300);

    return () => clearTimeout(timer);
  }, [nameInput]);

  const handleFilterChange = (newFilters: {
    name: string;
    category: string;
  }) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      category: newFilters.category,
    }));
    setNameInput(newFilters.name);
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
      {loadingPage ? (
        <Loader />
      ) : (
        <>
          <ProductsFilter
            nameFilter={nameInput}
            categoryFilter={filters.category}
            onFilterChange={handleFilterChange}
            loading={loadingSearch}
          />
          <div className="container">
            <div className="row">
              <a href="#" className="upHeaderPage">
                <i className="bi bi-arrow-up"></i>
              </a>
              {products.map((productItem, index) => (
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
                      {productInlist &&
                        productInlist.includes(productItem.id) && (
                          <i
                            style={{ color: "green" }}
                            className="bi bi-circle-fill"
                          ></i>
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
          </div>
        </>
      )}
    </>
  );
};
