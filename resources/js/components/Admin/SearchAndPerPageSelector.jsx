const SearchAndPerPageSelector = ({
  currentPerPage,
  handlePerPageChange,
  loading,
  searchQuery,
  handleSearchChange,
}) => {
  return (
    <div className="row justify-content-between align-items-center g-2 mb-3">
      <div className="col-auto">
        <select
          className="form-select"
          aria-label="Numero di elementi per pagina"
          value={currentPerPage}
          onChange={handlePerPageChange}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>

      <div className="col-auto cont-searchInput">
        <div className="d-flex align-items-center gap-2">
          {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
          <input
            type="search"
            className="form-control"
            style={{ width: '230px', paddingRight: '36px' }}
            name="search"
            placeholder="Cerca..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <i className="fa-solid fa-magnifying-glass" id="searchIcon"></i>
        </div>
      </div>
    </div>
  );
};

export default SearchAndPerPageSelector;
