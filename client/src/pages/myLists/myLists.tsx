import { useEffect, useState } from "react";
import { type ShoppingList } from "../../types/shoppingList";
import { Loader } from "../../components/loader";
import { Link } from "react-router-dom";
import axios from "axios";

export const MyLists = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      {loading && <Loader />}
      {lists.length === 0 && !loading ? (
        <p className="container text-center">Não existem listas no momento</p>
      ) : (
        !loading && (
          <>
            <section>
              <div className="container text-center">
                <h1>Histórico de listas</h1>
              </div>
            </section>
            <ul className="list-group">
              {lists.map((listName, index) => (
                <li key={index} className="list-group-item">
                  <Link className="lists-link" to={`/lists/${listName.id}`}>
                    {listName.name}
                  </Link>
                 <i className="bi bi-trash"></i>
                </li>
              ))}
            </ul>
          </>
        )
      )}
    </>
  );
};
