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
      <div className="container container-filter mt-2">
        <div className="card card-filter">
          <div className="card-header card-header-filter">Buscar produto</div>
          <div className="card-body">
            <form role="search">
              <div className="row">
                <div
                  className="container container-input"
                >
                  <i className="bi bi-search"></i>
                  <input
                    className="form-control input-search-products"
                    type="search"
                    onChange={handleInputChange}
                    value={searchParams.get("name") || ""}
                    placeholder="Pesquise o nome do produto..."
                    aria-label="Search"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <select
                  className="form-select select-search-products"
                  aria-label="Default select example"
                  onChange={handleSelectChange}
                  value={searchParams.get("category") || ""}
                >
                  <option value="">Selecione categoria de Produtos</option>
                  <option value="Material de higiene">
                    Material de higiene
                  </option>
                  <option value="Material de limpeza">
                    Material de limpeza
                  </option>
                  <option value="Hortifruti">Hortifruti</option>
                  <option value="Carnes">Carnes</option>
                  <option value="Itens pra cachorro">Itens pra cachorro</option>
                  <option value="Alimentos não pereciveis">
                    Alimentos nao pereciveis
                  </option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Padaria">Padaria</option>
                  <option value="Temperos e especiarias">
                    Temperos e especiarias
                  </option>
                  <option value="Doces e guloseimas">Doces e guloseimas</option>
                  <option value="Laticinios e ovos">Laticinios e ovos</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
