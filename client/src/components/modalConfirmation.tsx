import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  listId:number | null
  onClose: () => void;
}
export const ModalConfirmation = ({ onClose, listId }: Props) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/list-delete/${listId}`,
          { withCredentials: true }
      )
      navigate(0);
    } catch (error) {
      console.log(error);
    }
}
  
  return (
    <>
      <div className="modal show d-block">
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
              <p>Tem certeza que deseja excluir este item?</p>
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
                className="btn btn-success">
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
