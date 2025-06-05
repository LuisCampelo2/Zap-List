import video from "../../videos/VamosAsCompras.mp4";

export const HeaderBottom = () => {
  return (
    <>
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "auto" }}
      />
    </>
  );
};
