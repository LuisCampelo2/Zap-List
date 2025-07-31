import { Outlet } from "react-router-dom";
import { HeaderTop } from "./components/headerTop";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/main.scss";
import { useLocation } from "react-router-dom";
import { Loader } from "./components/loader";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <header id="#">
        <HeaderTop />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
