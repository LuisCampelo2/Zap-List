import { type ShoppingListProducts } from "../types/shoppingListProduct";

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
  return (
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
          <>
            {(() => {
              const productItem = products.find(
                (productItem) => productItem.id === modalObservation
              );

              if (!productItem) {
                return <h1>Sem Observações</h1>;
              }

              return (
                <div>{productItem.observation || <h1>Sem observações</h1>}</div>
              );
            })()}
          </>
        </div>
      </div>
    </div>
  );
};
