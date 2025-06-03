import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const PrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/api/me", {
          withCredentials: true, 
        });
        setAuthenticated(true);
      } catch (err) {
        console.log(err);
        setAuthenticated(false);
      }  finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
