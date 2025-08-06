import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModalConfirmationList } from "../components/modalConfirmationDeleteList";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists } from "../slices/listsSlice";
import { type RootState, type AppDispatch } from "../store/store";

export const MyLists = () => {
  const lists = useSelector((state: RootState) => state.lists.lists);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [selectedList, setSelectList] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    setSelectList(id);
    setModalConfirmation(true);
  };

  return (
    <>
      {lists.length === 0 ? (
        <>
          <div className="container">
            <div className="card">
              <div className="card-header">
                <h1>Voce não tem listas no momento</h1>
              </div>
              <div className="card-body d-flex justify-content-center">
                <Link className="btn btn-all" to="/createList">
                  Criar Lista
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
          <>
            <section>
              <div className="container text-center">
                <h1>Minhas Listas</h1>
              </div>
            </section>
            <div className="container container-lists">
              <Link className="btn btn-all" to="/createList">
                Criar Lista nova
              </Link>
              <div className="row">
                {lists.map((listName, index) => (
                  <div className="col-12 col-lg-4 container">
                    <Link to={`/lists/${listName.id}`}>
                      <div key={index} className="card card-lists">
                        <h1>{listName.name}</h1>
                        <h1>Clique para ver mais</h1>
                      </div>
                    </Link>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(listName.id)}
                    >
                      Excluir Lista
                    </button>
                  </div>
                ))}
                {modalConfirmation && (
                  <ModalConfirmationList
                    listId={selectedList}
                    onClose={() => setModalConfirmation(false)}
                  />
                )}
              </div>
            </div>
          </>
      )}
    </>
  );
};
