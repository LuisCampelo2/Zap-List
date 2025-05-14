import { useEffect, useState } from "react";
import { type ShoppingList } from "../../types/shoppingList";
import { Loader } from "../../components/loader";
import { Link } from "react-router-dom";

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
      await wait(1000);
      try {
        const res = await fetch(
          "https://project-list-3.onrender.com/api/lists"
        );
        if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
        const data = await res.json();
        console.log("Resposta da API:", data);

        if (Array.isArray(data)) {
          setLists(data);
        } else {
          console.error("Resposta da API não é um array:", data);
          setLists([]);
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
                  <Link to={`/lists/${listName.id}`}>{listName.name}</Link>
                </li>
              ))}
            </ul>
          </>
        )
      )}
    </>
  );
};
