import { useState } from "react";
import type React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, {
        email,
        password,
        name,
        lastName,
      });
      console.log("Cadastro feito com sucesso!");
      navigate("/activation");
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
          <h1>Register</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <input
                placeholder="Nome:"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-control"
                type="text"
                required
              />
            </div>
            <div className="row">
              <input
                placeholder="Sobrenome:"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="form-control"
                type="text"
                required
              />
            </div>
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
             {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
          </div>
          <div className="card-footer">
            <div className="row">
              <button
                type="submit"
                className="btn btn-submit"
                disabled={loading}
              >
                {loading ? "Criando conta..." : "Criar conta"}
              </button>
            </div>
            <div className="row">
              <Link className="btn btn-all" to="/login">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
