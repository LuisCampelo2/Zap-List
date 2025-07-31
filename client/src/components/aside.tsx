import { Link } from "react-router-dom";
import { type RootState } from "../store/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {
  onClose: () => void;
};

export const Aside = ({ onClose }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/me`, {
          withCredentials: true,
        });
        dispatch(setUser(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [dispatch]);

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, null, {
        withCredentials: true,
      });
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
            <Link
              className="nav-item-aside"
              to="createList">
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
