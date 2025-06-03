import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { type User } from "../../types/user";

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchUser();
  }, [accessToken]);

  return (
    <>
      <nav style={{ backgroundColor: "rgb(16, 18, 24)" }}>
        <ul className="nav col-6">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
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
         {accessToken ? (
          <h1>Ola {user?.name}</h1>
            ) : (
              <>
                <div className="col-6 d-flex justify-content-end">
                  <Link className="nav-link" to="/register">
                    Criar Conta
                  </Link>
                  <Link className="nav-link" to="/login">
                    Entrar
                  </Link>
                </div>
              </>
            )}
      </nav>
    </>
  );
};
