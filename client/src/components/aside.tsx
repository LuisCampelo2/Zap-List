import { type RootState,type AppDispatch } from "../store/store";
import { useSelector,useDispatch } from "react-redux";
import { clearUser, getUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logoutApi } from "../api/auth";
import { Link } from "react-router-dom";

type Props = {
  onClose: () => void;
};

export const Aside = ({ onClose }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const logout = async () => {
    try {
      logoutApi();
      dispatch(clearUser());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="aside open">
      <i onClick={onClose} className="bi bi-x-lg"></i>
      <nav className="nav-aside">
        {user ? (
          <>
            <h4>Olá, {user.name}</h4>

            <Link className="nav-item-aside" to="/lists">
              Minhas listas
            </Link>

            <Link className="nav-item-aside" to="/products">
              Produtos
            </Link>
            <Link className="nav-item-aside" to="createList">
              Criar Lista
            </Link>
            <a
              onClick={logout}
              className="nav-item-aside"
              aria-current="page"
              href="#"
            >
              Sair da conta
            </a>
          </>
        ) : (
          <>
            <Link className="nav-item-aside" to="/register">
              Criar Conta
            </Link>
            <Link className="nav-item-aside" to="/login">
              Entrar
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};
