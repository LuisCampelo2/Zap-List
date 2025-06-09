import { useSearchParams } from "react-router-dom";

export const ProductsFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;

    if (name === "") {
      searchParams.delete("name");
    } else {
      searchParams.set("name", name);
    }
    setSearchParams(searchParams);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;

    if (category === "") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }

    setSearchParams(searchParams);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <form role="search">
            <div
              style={{ border: "1px solid black", height:'30px' }}
              className="container d-flex align-items-center gap-2 mt-3"
            >
              <i className="bi bi-search"></i>
              <input
                style={{width:'300px',border: 'none'}}
                type="search"
                onChange={handleInputChange}
                value={searchParams.get("name") || ""}
                placeholder="Pesquise o nome do produto..."
                aria-label="Search"
              />
            </div>
          </form>
        </div>
        <div className="row mt-3">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleSelectChange}
            value={searchParams.get("category") || ""}
          >
            <option value="">Selecione categoria de Produtos</option>
            <option value="Material de higiene">Material de higiene</option>
            <option value="Material de limpeza">Material de limpeza</option>
            <option value="Frutas">Frutas</option>
            <option value="Legumes e verdura">Legumes e verdura</option>
            <option value="Carne">Carne</option>
            <option value="Itens pra cachorro">Itens pra cachorro</option>
            <option value="Alimentos nao pereciveis">
              Alimentos nao pereciveis
            </option>
            <option value="Bebidas">Bebidas</option>
            <option value="Laticinios">Laticinios</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
      </div>
    </>
  );
};
