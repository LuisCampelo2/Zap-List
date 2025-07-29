import { useEffect, useState } from "react";
import axios from "axios";
import { type Product } from "../../types/product";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`,
          {
            withCredentials: true,
          }
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);
  return (
    <>
      <div className="container container-home">
        <h1>O que gostaria hoje?</h1>
        <div className="row row-home">
          {[...new Set(products.map((p) => p.category))].map(
            (category, index) => (
              <div className="col-12 col-lg-3 container" key={index}>
                <div className="card card-home">
                  <Link to={`/products?category=${category}`}>
                    <div className="card-body">
                      <img
                        className="imgs-category-home"
                        src={`/imgs/${category}.png`}
                        alt=""
                      />
                    </div>
                    <div className="card-footer">
                      <p>{category}</p>
                    </div>
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
