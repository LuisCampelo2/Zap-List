import { useEffect, useState } from "react";
import { type Product } from "../../types/product";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  function wait(delay: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  useEffect(() => {
    const fetchProdutos = async () => {
      await wait(400);
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);
  
  return (
    <>
      <div
        className="container">
        <div
          style={{rowGap:"40px", display: "flex", flexWrap: "wrap",marginTop:"30px" }}
          className="row">
          {products.map((productItem, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <div className="card" style={{ width: "100%" }}>
                <img
                  style={{width:'100%',height:'214px',objectFit:"cover",objectPosition:"center"}}
                  src={`http://localhost:3000/imgs/${productItem.photo}`}
                  className="card-img-top"
                  alt={productItem.name}
                />
                {console.log(productItem.photo)}
                <div className="card-body">
                  <h5 className="card-title">{productItem.name}</h5>
                  <p className="card-text">Categoria: <strong>{productItem.category}</strong></p>
                  <button>Adicionar a lista</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
