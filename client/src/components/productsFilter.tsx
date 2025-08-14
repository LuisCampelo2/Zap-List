
type ProductsFilterProps = {
  nameInput: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ProductsFilter = ({
  nameInput,
  handleSearch,
}: ProductsFilterProps) => {

  return (
    <div className={`container container-search`}>
      <input
        className="input-search-products"
        id="nameInput"
        type="text"
        value={nameInput}
        onChange={(e) => handleSearch(e)}
        placeholder="Buscar produto..."
      />
    </div>
  );
};
