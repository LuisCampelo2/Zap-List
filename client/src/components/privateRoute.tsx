import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;

};
