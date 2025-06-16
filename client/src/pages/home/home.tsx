import videoDesktop from "../../videos/VamosAsComprasDesktop.gif";
import videoMobile from '../../videos/VamosAsComprasMobile.gif';
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <div className="home-container">
        <img
          className="video-desktop"
          src={videoDesktop}
        />
        <img
          className="video-mobile"
          src={videoMobile}
          alt="" />
        <Link className="btn btn-video" to="/createList">
          Começar Agora
        </Link>
      </div>
    </>
  );
};
