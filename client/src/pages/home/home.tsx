import { Link } from "react-router-dom";
import { HeaderBottom } from "../../components/header/headerBottom";

export const HomePage = () => {
  return (
    <>
      <HeaderBottom />

      <main className="homepage text-center">
        <section className="hero">
          <h1 className="display-4 fw-bold">🛒 Lista de Compras Inteligente</h1>
          <p className="lead text-muted">
            Organize suas compras de forma simples, rápida e eficaz.
          </p>
          <Link className="btn btn-all mt-3" to="/createList">
            Começar Agora
          </Link>
        </section>

        <section className="features container mt-5">
          <div className="row">
            <div className="col-md-4">
              <h5>✔️ Crie listas personalizadas</h5>
            </div>
            <div className="col-md-4">
              <h5>🛍️ Adicione produtos facilmente</h5>
            </div>
            <div className="col-md-4">
              <h5>📱 Interface responsiva</h5>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
