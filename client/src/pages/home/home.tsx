import videoDesktop from "../../videos/VamosAsComprasDesktop.mp4";
import videoMobile from '../../videos/VamosAsComprasMobile.gif';
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <div className="home-container">
        <video
          className="video-desktop"
          src={videoDesktop}
          autoPlay
          loop
          muted
          playsInline
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
