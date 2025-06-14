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
  const [loading, setLoading]=useState(false);
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
      alert(error);
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
              />
            </div>
            <div className="row">
              <input
                placeholder="Sobrenome:"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="form-control"
                type="text"
              />
            </div>
            <div className="row">
              <input
                placeholder="Email:"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                type="email"
              />

              <input
                placeholder="Senha:"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <button
                type="submit"
                className="btn btn-submit"
                disabled={loading}
              >
                {loading ? "Carregando..." : "Criar conta"}
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
