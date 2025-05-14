import { useState } from "react";
import axios from "axios";

export const ShoppingListForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://project-list-3.onrender.com/api/shopping-lists",
        { name }
      );
      alert("Lista criada com sucesso!");
      setName("");
    } catch (erro) {
      alert(erro);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Nome da Lista</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ex: Lista da semana"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Criar Lista
      </button>
    </form>
  );
};
