import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  shoppingProductId: number | null
  
  onClose: () => void;
}

export const ModalConfirmationProduct = ({ shoppingProductId, onClose }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  
  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/product-list-delete/${shoppingProductId}`, {
        withCredentials:true
      })
      navigate(0);
    } catch (error) {
      console.log(error);
    } finally {
       setLoading(false);
    }
    
  }

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
              <p>Tem certeza que deseja excluir o produto da sua lista de compras?</p>
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
