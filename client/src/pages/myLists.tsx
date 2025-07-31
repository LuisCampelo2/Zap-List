import { useEffect, useState } from "react";
import { type ShoppingList } from "../types/shoppingList";

import { Link } from "react-router-dom";
import axios from "axios";
import { ModalConfirmationList } from "../components/modalConfirmationDeleteList";

export const MyLists = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [selectedList, setSelectList] = useState<number | null>(null);

  function wait(delay: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  useEffect(() => {
    setLoading(true);
    const fetchLists = async () => {
      await wait(500);
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
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  const handleDelete = (id: number) => {
    setSelectList(id);
    setModalConfirmation(true);
  };

  return (
    <>
      {lists.length === 0 && !loading ? (
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
        !loading && (
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
        )
      )}
    </>
  );
};
