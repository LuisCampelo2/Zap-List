import type { ShoppingListProducts } from "../types/shoppingListProduct";

type OptionsProps = {
  productId: number;
  product: ShoppingListProducts;
  handleDelete: (id: number) => void;
  handleObservation: (id: number) => void;
  onClose: () => void;
};

export const ModalOptions = ({
  productId,
  handleDelete,
  handleObservation,
  onClose,
  product,
}: OptionsProps) => {
  return (
    <>
      <div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Opções</h5>
              <button
                onClick={onClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {product.observation && (
                <button
                  onClick={() => handleObservation(productId)}
                  className="btn btn-primary"
                >
                  <i className="bi bi-envelope"></i>
                </button>
              )}

              <button className="btn btn-danger">
                <i
                  onClick={() => handleDelete(productId)}
                  className="bi bi-trash"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
