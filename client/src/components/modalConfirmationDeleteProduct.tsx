import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductInList } from "../slices/listProductsSlice";
import { type RootState, type AppDispatch } from "../store/store";

interface Props {
  shoppingProductId: number | null;

  onClose: () => void;
}

export const ModalConfirmationProduct = ({
  shoppingProductId,
  onClose,
}: Props) => {
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.listProduct.loading);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    const res = await dispatch(
      deleteProductInList({ shoppingProductId: Number(shoppingProductId) })
    );
    if (deleteProductInList.fulfilled.match(res)) {
      navigate(0);
    }
  };

  return (
    <>
      <div className="modal-delete-product modal show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Excluir</h5>
              <button
                onClick={onClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Tem certeza que deseja excluir o produto da sua lista de
                compras?
              </p>
            </div>
            <div className="modal-footer">
              <button
                onClick={onClose}
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                type="button"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
