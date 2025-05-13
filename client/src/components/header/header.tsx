import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "black"}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item"></li>
              <li className="nav-item">
                <Link className="nav-link" to="lists">
                  Minhas Listas
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/products">
                  Produtos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
