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
          <svg
            onClick={handleAside}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </li>

        <Link className="navbar-brand" to="/">
          <img className="rounded-circle logo-img" src={logo} alt="logo" />
        </Link>
      </ul>
    </>
  );
};
