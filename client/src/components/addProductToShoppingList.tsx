import axios from "axios";
import { useState } from "react";
import { type Product } from "../types/product";
import { type ShoppingList } from "../types/shoppingList";
import { type ShoppingListProducts } from "../types/shoppingListProduct";
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
  const [observation, setObservation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProductId(product.id);
    const fetchLists = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/lists`,
          {
            withCredentials: true,
          }
        );
        if (!res || res.status !== 200) {
          throw new Error(`Erro HTTP: ${res?.status}`);
        } else {
          setLists(res.data);
        }
      } catch (error) {
        console.error("Erro ao buscar listas:", error);
      }
    };
    fetchLists();
  }, [product.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: ShoppingListProducts = {
      shoppingListId,
      productId,
      quantity,
      observation: observation ?? null,
    };
    
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shopping-list-add-product`,
        payload
      );
      onClose();
      setShoppingListId(null);
      setProductId(null);
      setQuantity(null);
      setObservation("");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
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
                src={`${import.meta.env.VITE_API_URL}/imgs/${product.photo}`}
                alt=""
              />
              {product.name}
              <form onSubmit={handleSubmit}>
                <input
                  style={{ width: "100px" }}
                  placeholder="Quantidade:"
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
                <label htmlFor="">Deseja fazer observações?</label>
                <textarea
                  style={{ width: "100%", height: "200px", marginTop: "3px" }}
                  placeholder={`Observações:\nEx: preferência de marca,\npeso do alimento que deseja...`}
                  value={observation ?? ""}
                  onChange={(e) => setObservation(e.target.value)}
                  name=""
                  id=""
                ></textarea>
                <div className="modal-footer">
                 <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Carregando..." : "Salvar"}
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
