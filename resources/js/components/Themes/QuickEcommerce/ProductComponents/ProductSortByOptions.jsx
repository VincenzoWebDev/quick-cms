const ProductSortByOptions = ({ sortBy, handleSort }) => {
  return (
    <div className="list-group">
      <label htmlFor="name" className="list-group-item-action">
        <input
          className="form-check-input me-2"
          type="radio"
          id="name"
          value="name"
          checked={sortBy === 'name'}
          onChange={() => handleSort('name')}
        />
        Nome
      </label>

      <label htmlFor="price" className="list-group-item-action">
        <input
          className="form-check-input me-2"
          type="radio"
          id="price"
          value="price"
          checked={sortBy === 'price'}
          onChange={() => handleSort('price')}
        />
        Prezzo
      </label>

      <label htmlFor="created_at" className="list-group-item-action">
        <input
          className="form-check-input me-2"
          type="radio"
          id="created_at"
          value="created_at"
          checked={sortBy === 'created_at'}
          onChange={() => handleSort('created_at')}
        />
        Data
      </label>
    </div>
  );
};

export default ProductSortByOptions;
