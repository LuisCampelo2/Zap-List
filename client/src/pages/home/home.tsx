import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button style={{ color: "white", backgroundColor: "black" }}>
        <Link to="/createList">Criar Lista De compras</Link>
      </button>
    </main>
  );
};
