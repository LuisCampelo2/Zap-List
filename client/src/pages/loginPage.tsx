import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      dispatch(setUser(res.data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data.message || "Erro no servidor.");
        } else if (error.request) {
          setErrorMessage("Servidor não respondeu. Tente novamente.");
        } else {
          setErrorMessage("Erro inesperado. Tente novamente.");
        }
      } else {
        setErrorMessage("Erro desconhecido")
      } 
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container container-auth">
      <div className="card">
        <div className="card-header">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <input
                placeholder="Email:"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                type="email"
                required
              />
            </div>
            <div className="row">
              <input
                placeholder="Senha:"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
                type={showPassword ? "text" : "password"}
                required
              />
                {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="btn btn-link d-flex position-absolute justify-content-end end-0"
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "10px",
                }}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <button
                type="submit"
                className="btn btn-submit"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Login"}
              </button>
            </div>
            <div className="row">
              <Link className="btn btn-all" to="/register">
                Criar conta
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
