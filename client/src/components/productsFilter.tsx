import { useEffect, useState } from "react";

type ProductsFilterProps = {
  nameFilter: string;
  categoryFilter: string;
  loading:boolean
  onFilterChange: (filters: { name: string; category: string }) => void;
};

export const ProductsFilter = ({
  nameFilter,
  categoryFilter,
  onFilterChange,
  loading,
}: ProductsFilterProps) => {
  const [localName, setLocalName] = useState(nameFilter);
  const [localCategory, setLocalCategory] = useState(categoryFilter);

    useEffect(() => {
    setLocalName(nameFilter);
  }, [nameFilter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value)
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalCategory(e.target.value)
  };

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    onFilterChange({name:localName,category:localCategory})
  }

  const handleClearFilter = () => {
    setLocalName('');
    setLocalCategory('');
    onFilterChange({ name: '', category: '' });
  }

  return (
    <>
      <div className="container container-filter mt-2">
        <div className="card card-filter">
          <div className="card-header card-header-filter">Buscar produto</div>
          <div className="card-body">
            <form onSubmit={handleSubmit} role="search">
              <div className="row">
                <div className="container container-input">
                  <i
                    className="bi bi-search"></i>
                  <input
                    className="form-control input-search-products"
                    type="search"
                    onChange={handleInputChange}
                    value={localName}
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
                  value={localCategory}
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
                  <option value="Peixes">Peixes</option>
                  <option value="Itens pra cachorro">Itens pra cachorro</option>
                  <option value="Alimentos não pereciveis">
                    Alimentos nao pereciveis
                  </option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Padaria">Padaria</option>
                  <option value="Massas">Massas</option>
                  <option value="Temperos e especiarias">
                    Temperos e especiarias
                  </option>
                  <option value="Doces e guloseimas">Doces e guloseimas</option>
                  <option value="Laticinios e ovos">Laticinios e ovos</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={handleClearFilter}
                  className="btn btn-all flex-fill"
                >
                    Limpar Filtro
                </button>
                 <button
                  className="btn btn-all flex-fill"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Buscando..." : "Buscar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
