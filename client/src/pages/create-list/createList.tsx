import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShoppingListForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shopping-lists`,
        { name },
        { withCredentials: true }
      );
      navigate("/lists");
      setName("");
    } catch (erro) {
      console.log(erro);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <h1>Vamos Criar sua lista?</h1>
        <input
          type="text"
          placeholder="Digite aqui:"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-all">
        Criar Lista
      </button>
    </form>
  );
};
