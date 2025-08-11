import { useEffect, useState } from "react";
import { type ShoppingListProducts } from "../types/shoppingListProduct";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store/store";
import { updateObservation } from "../slices/listProductsSlice";

type ModalObservationProps = {
  products: ShoppingListProducts[];
  modalObservation: number | null;
  setModalObservation: (value: number | null) => void;
};

export const ModalObservation = ({
  products,
  modalObservation,
  setModalObservation,
}: ModalObservationProps) => {
  const productItem = products.find(
    (productItem) => productItem.id === modalObservation
  );
  const hasObservation = productItem?.observation?.trim();
  const [textArea, setTextArea] = useState(false);
  const [observation, setObservation] = useState<string | null>(null);
  const loading = useSelector((state: RootState) => state.listProduct.loading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setObservation(productItem?.observation || "");
  }, [modalObservation, productItem]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!modalObservation) return;
    try {
      await dispatch(
        updateObservation({
          observation: observation,
          shoppingProduct: Number(modalObservation),
        })
      );
      setTextArea(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {textArea ? (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder={`Observações:\nEx: preferência de marca,\npeso do alimento que deseja...`}
            value={observation ?? ""}
            onChange={(e) => setObservation(e.target.value)}
            name=""
            id=""
          ></textarea>
          <button disabled={loading} type="submit">
            Confirmar alteração
          </button>
          <button type="button" onClick={() => setTextArea(false)}>
            Fechar
          </button>
        </form>
      ) : (
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
              {hasObservation ? (
                <>
                  <div>{productItem?.observation}</div>
                  <i onClick={() => setTextArea(true)} className="bi bi-pencil">
                    Editar Observação
                  </i>
                </>
              ) : (
                <>
                  <h1>Sem Observações</h1>

                  <i onClick={() => setTextArea(true)} className="bi bi-pencil">
                    Criar Observação
                  </i>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
