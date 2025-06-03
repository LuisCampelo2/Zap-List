import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", { email, password },{
        withCredentials: true,
      })
      dispatch(setUser(res.data.user));
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <label htmlFor="">Email:</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                type="email"
              />
            </div>
            <div className="row">
              <label htmlFor="">Senha:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-6 d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  Entrar
                </button>
                <button type="reset" className="btn btn-danger">
                  Cancelar
                </button>
              </div>
              <div className="col-6 d-flex justify-content-end align-items-center">
                Nao tem conta? <Link to="/register">Criar conta</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
