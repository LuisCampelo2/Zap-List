import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "./loader";
import { checkAuth } from "../slices/userSlice";
import { type AppDispatch, type RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

export const PrivateRoute = () => {
  const authenticated = useSelector(
    (state: RootState) => state.user.authenticated
  );
  const loading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!authenticated && !loading) {
      dispatch(checkAuth());
    }
  }, [dispatch, authenticated, loading]);

  if (loading) return <Loader />;

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
