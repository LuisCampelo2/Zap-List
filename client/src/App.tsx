import { Outlet } from "react-router-dom";
import { HeaderTop } from "./components/header/headerTop";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './styles/main.scss';

function App() {
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
