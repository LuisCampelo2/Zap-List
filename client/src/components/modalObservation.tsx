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
        <div className="container modal-observation">
          <div className="card card-observation">
            <div className="card-body d-flex justify-content-center">
              <form onSubmit={handleSubmit}>
                <div className="row">
 <textarea
                  className="text-area-observation"
                  placeholder={`Observações:\nEx: preferência de marca,\npeso do alimento que deseja...`}
                  value={observation ?? ""}
                  onChange={(e) => setObservation(e.target.value)}
                  name=""
                  id=""
                ></textarea>
                </div>
               
                <div className="card-footer d-flex gap-3">
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => setTextArea(false)}
                  >
                    Fechar
                  </button>
                  <button
                    className="btn btn-success"
                    disabled={loading}
                    type="submit"
                  >
                    Confirmar alteração
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="container modal-observation">
          <div className="card card-observation">
            <div className="d-flex card-header observation-header justify-content-between">
              <i
                onClick={() => setModalObservation(null)}
                className="bi bi-x-lg"
              ></i>
              Observações{" "}
              <i
                onClick={() => setTextArea(true)}
                className="bi bi-pencil"
              ></i>
            </div>
            <div className="card-body">
              {hasObservation ? (
                <>
                  <div>{productItem?.observation}</div>
                </>
              ) : (
                <>
                  <p>Sem Observações</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
