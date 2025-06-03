import { useEffect  } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../slices/userSlice";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true,
        });
        dispatch(setUser(res.data));
      } catch (error) {
        alert(error);
      }
    };
    fetchUser();
  }, [dispatch]);

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout", null, {
        withCredentials: true,
      });
      dispatch(clearUser());
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {user ? (
                  <>
                    <a onClick={logout} type="button" className="nav-link">
                      Logout
                    </a>
                  </>
                ) : (
                  <>
                    <Link className="nav-link" to="/register">
                      Criar Conta
                    </Link>
                    <Link className="nav-link" to="/login">
                      Entrar
                    </Link>
                  </>
                )}
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
          

            {user && <h1>Olá {user.name}</h1>}
          </div>
        </div>
      </nav>
    </>
  );
};
