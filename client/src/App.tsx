import { Outlet } from "react-router-dom";
import { HeaderTop } from "./components/header/headerTop";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './styles/main.scss';
import { Footer } from "./components/footer";

function App() {
  return (
    <>
      <header>
        <HeaderTop />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default App;
