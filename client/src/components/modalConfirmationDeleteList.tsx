import { useNavigate } from "react-router-dom";
import { deleteList } from "../slices/listsSlice";
import { useDispatch,useSelector } from "react-redux";;
import { type AppDispatch,type RootState } from "../store/store";

interface Props {
  listId:number | null
  onClose: () => void;
}
export const ModalConfirmationList = ({ onClose, listId }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); 
  const loading = useSelector((state: RootState) => state.lists.loading);

  // function wait(ms:number) {
  // return new Promise(resolve => setTimeout(resolve, ms));
  // }
  
  const handleDelete = async () => {
    dispatch(deleteList(listId));
    navigate(0);
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
              <p>Tem certeza que deseja excluir esta lista?</p>
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
