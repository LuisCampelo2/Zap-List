import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createList } from "../slices/listsSlice";
import { type AppDispatch } from "../store/store";

export const ShoppingListForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await dispatch(createList({ name }));

    if (createList.fulfilled.match(res)) {
      navigate("/lists");
      setName("");
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
