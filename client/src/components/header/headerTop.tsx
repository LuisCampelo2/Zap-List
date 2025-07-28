import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../imgs/logo.png";
import { Aside } from "../aside/aside";
import { useLocation } from "react-router-dom";

export const HeaderTop = () => {
  const [aside, setAside] = useState(false);
  const location = useLocation();

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

        <Link className="navbar-brand" to="/home">
          <img className="rounded-circle logo-img" src={logo} alt="logo" />
        </Link>
      </ul>
    </>
  );
};
