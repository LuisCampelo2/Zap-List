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
  const navigate=useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, {
        email,
        password,
        name,
        lastName,
      });
      console.log('Cadastro feito com sucesso!')
      navigate('/activate');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>Register</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <label htmlFor="">Nome:</label>
                <input
                  placeholder="Digite seu nome..."
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-6">
                <label htmlFor="">Sobrenome:</label>
                <input
                  placeholder="Digite seu sobrenome..."
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="">Email:</label>
                <input
                  placeholder="Digite seu email..."
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="form-control"
                  type="email"
                />
              </div>
              <div className="col-6">
                <label htmlFor="">Senha:</label>
                <input
                  placeholder="Crie sua senha..."
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="form-control"
                  type="password"
                />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-6 d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Criar Conta
                </button>
                <button type="reset" className="btn btn-danger">
                  Cancelar
                </button>
              </div>
              <div className="col-6 d-flex justify-content-end align-items-center">
                Ja tem conta? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
