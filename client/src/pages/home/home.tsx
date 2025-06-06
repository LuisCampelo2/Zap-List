import videoDesktop from "../../videos/VamosAsComprasDesktop.mp4";
import videoMobile from '../../videos/VamosAsComprasMobile.mp4';
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
        <video
          className="video-mobile"
          src={videoMobile}
          autoPlay
          loop
          muted
          playsInline
        />
        <Link className="btn btn-video" to="/createList">
          Começar Agora
        </Link>
      </div>
    </>
  );
};
