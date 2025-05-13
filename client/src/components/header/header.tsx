import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <>
      <nav style={{backgroundColor:"rgb(16, 18, 24)"}}>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/lists">
              Listas de compra
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">
              Produtos
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
