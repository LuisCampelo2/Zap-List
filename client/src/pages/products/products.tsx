import { useEffect, useState } from "react";
import { type Product } from "../../types/product";
import { useSearchParams } from "react-router-dom";
import { ProductsFilter } from "../../components/productsFilter";
import { Loader } from "../../components/loader";
import { AddProductToShoppingList } from "../../components/addProductToShoppingList";

export const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addProductModal, setAddProductModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const nameFilter = searchParams.get("name");

  function wait(delay: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  useEffect(() => {
    setLoading(true);
    const fetchProdutos = async () => {
      await wait(1000);
      try {
        const res = await fetch(
          "https://project-list-3.onrender.com/api/products"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = categoryFilter
      ? p.category === categoryFilter
      : true;
    const matchesName = nameFilter
      ? p.name.toLowerCase().includes(nameFilter.toLowerCase())
      : true;
    return matchesCategory && matchesName;
  });

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
      {loading ? (
        <Loader />
      ) : (
        <>
          <ProductsFilter />
          <div className="container">
            <div
              style={{
                rowGap: "40px",
                display: "flex",
                flexWrap: "wrap",
                marginTop: "30px",
              }}
              className="row"
            >
              {filteredProducts.map((productItem, index) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                  <div className="card" style={{ width: "100%" }}>
                    <img
                      style={{
                        width: "100%",
                        height: "214px",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      src={`https://project-list-3.onrender.com/imgs/${productItem.photo}`}
                      className="card-img-top"
                      alt={productItem.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{productItem.name}</h5>
                      <p className="card-text">
                        Categoria: <strong>{productItem.category}</strong>
                      </p>
                      <button
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
