const SearchAndPerPageSelector = ({ currentPerPage, handlePerPageChange, loading, searchQuery, handleSearchChange }) => {
    return (
        <div className="row justify-content-between border-bottom mb-3">
            <div className='col-md-6 col-lg-4'>
                <div className="row align-items-baseline">
                    <div className="col-9 px-0 search-input">
                        <input type="search" className="form-control mb-3" name="search" placeholder="Cerca prodotto..."
                            style={{ paddingLeft: '45px' }}
                            value={searchQuery} onChange={handleSearchChange} />
                        <i className="fa-solid fa-magnifying-glass" id='searchIcon'></i>
                    </div>
                    <div className="col-md-2">
                        {loading && <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>}
                    </div>
                </div>
            </div>
            <div className='col-auto'>
                <div className="row align-items-baseline">
                    <div className="col-auto px-0">
                        <label htmlFor="perPage" className="form-label w-100">Prodotti per pagina:</label>
                    </div>
                    <div className="col-auto">
                        <select className="form-select" aria-label="Default select example" value={currentPerPage} onChange={handlePerPageChange}>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchAndPerPageSelector