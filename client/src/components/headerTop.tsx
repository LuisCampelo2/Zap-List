import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import { Aside } from "../components/aside";
import { useLocation } from "react-router-dom";
import { setSearch } from "../slices/productsSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

export const HeaderTop = () => {
  const [aside, setAside] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const permitedPages = ["/products"]
  
  
const isPermitted = permitedPages.some((path) => {
  if (path.includes(":id")) {
    const basePath = path.split("/:")[0]; 
    return location.pathname.startsWith(basePath);
  }
  return location.pathname === path;
});

  const handleAside = () => {
    setAside((prev) => !prev);
  };

  useEffect(() => {
    setAside(false);
  }, [location.pathname]);

  return (
    <>
      {aside && <Aside onClose={handleAside} />}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <i
            onClick={handleAside}
            className="bi bi-list"></i>
        </li>

        <Link to="/">
          <img className="logo-img" src={logo} alt="logo" />
        </Link>
        {isPermitted && (
        <i onClick={() => dispatch(setSearch())} className="bi bi-search"></i>
      )}
      </ul>
    </>
  );
};
