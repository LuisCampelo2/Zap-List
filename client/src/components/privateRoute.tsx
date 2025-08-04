import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "./loader";

export const PrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/me`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            try {
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/refresh`,
                null,
                {
                  withCredentials: true,
                }
              );

              const retry = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/me`,
                {
                  withCredentials: true,
                }
              );

              if (retry.status === 200) {
                setAuthenticated(true);
                return;
              }
            } catch (refreshError) {
              console.log("Erro ao tentar renovar token:", refreshError);
            }
          }
        }

        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <Loader />;

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
