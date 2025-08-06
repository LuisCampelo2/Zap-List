import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type AppDispatch, type RootState } from "../store/store";
import { login } from "../slices/userSlice";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state: RootState) => state.user.loading);
  const [showPassword, setShowPassword] = useState(false);
  const errorMessage = useSelector((state: RootState) => state.user.error);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await dispatch(login({ email, password }))
    
    if (login.fulfilled.match(res)) {
      navigate("/");
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
