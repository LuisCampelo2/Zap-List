import { Link } from "react-router-dom"
import { type RootState } from "../../store/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {
  onClose: () => void;
}



export const Aside = ({onClose}:Props) => {
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
          <svg
            onClick={onClose}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
          <nav>
            {user ? (
              <>
                <a
                  onClick={logout}
                  className="nav-link"
                  aria-current="page"
                  href="#"
                >
                  Logout
                </a>
              
                <Link className="nav-link" to="/lists">
                  Listas de compra
                </Link>

                <Link className="nav-link" to="/products">
                  Produtos
                </Link>
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
          </nav>
        </aside>
  )
}