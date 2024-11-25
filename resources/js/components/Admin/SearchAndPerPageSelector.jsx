const SearchAndPerPageSelector = ({ currentPerPage, handlePerPageChange, loading, searchQuery, handleSearchChange }) => {
    return (
        <div className="row justify-content-between">
            <div className='col-auto'>
                <select className="form-select w-100" aria-label="Default select example" value={currentPerPage} onChange={handlePerPageChange}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>
            </div>
            <div className='col-auto cont-searchInput'>
                <div className="row align-items-baseline">
                    <div className="col-auto">
                        {loading && <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>}
                    </div>
                    <div className="col-auto">
                        <input type="search" className="form-control mb-3" style={{ width: '200px', paddingRight: '40px' }} name="search" placeholder="Cerca..."
                            value={searchQuery} onChange={handleSearchChange} />
                        <i className="fa-solid fa-magnifying-glass" id='searchIcon'></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchAndPerPageSelector