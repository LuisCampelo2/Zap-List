import axios from "axios";
import { useState } from "react";
import { type Product } from "../types/product";
import { type ShoppingList } from "../types/shoppingList";
import { useEffect } from "react";

interface Props {
  product: Product;
  onClose: () => void;
}

export const AddProductToShoppingList = ({ product, onClose }: Props) => {
  const [shoppingListId, setShoppingListId] = useState<number | null>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [lists, setLists] = useState<ShoppingList[]>([]);

  useEffect(() => {
    setProductId(product.id);
    const fetchLists = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/lists");
        if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
        const data = await res.json();
        console.log("Resposta da API:", data);

        if (Array.isArray(data)) {
          setLists(data);
        } else {
          console.error("Resposta da API não é um array:", data);
          setLists([]);
        }
      } catch (error) {
        console.error("Erro ao buscar listas:", error);
      }
    };
    fetchLists();
  }, [product.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/shopping-list-add-product", {
        shoppingListId,
        productId,
        quantity,
      });
      alert("Produto adicionado com sucesso");
      setShoppingListId(null);
      setProductId(null);
      setQuantity(null);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="modal show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Adicionar Produto</h5>
              <button
                onClick={onClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img
                style={{ objectFit: "cover", width: "100%" }}
                src={`http://localhost:3000/imgs/${product.photo}`}
                alt=""
              />
              {product.name}
              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity ?? ""}
                  onChange={(e) => setQuantity(+e.target.value)}
                  step="1"
                />
                <h5>Selecione a lista que quer adicionar o produto</h5>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={shoppingListId ?? ""}
                  onChange={(e) => setShoppingListId(+e.target.value)}
                >
                  <option value="">Selecione a lista de Compras</option>
                  {lists.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </select>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
