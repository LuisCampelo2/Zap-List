import { useState } from "react";
import type React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "../slices/userSlice";
import { type RootState, type AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const loading = useSelector((state: RootState) => state.user.loading);
  const [showPassword, setShowPassword] = useState(false);
  const errorMessage = useSelector((state: RootState) => state.user.error);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await dispatch(
      register({
        email,
        password,
        name,
        lastName,
      })
    );
    if (register.fulfilled.match(res)) {
      navigate("/activation");
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
