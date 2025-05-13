export const Loader = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{ width: "500px" }}
          className="progress"
          role="progressbar"
          aria-label="Animated striped example"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            style={{ width: "75%" }}
          ></div>
        </div>
      </div>
    </>
  );
};
