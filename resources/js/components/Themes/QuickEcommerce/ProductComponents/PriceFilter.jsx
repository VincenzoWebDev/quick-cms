function PriceFilter({ priceRange, setPriceRange }) {
    const handleRangeChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };
    return (
        <div className="price-filter mb-4">
            <h6 className="mb-2">Filtra per Prezzo</h6>
            <div className="d-flex flex-column align-items-start">
                <label>Min: {priceRange.min} €</label>
                <input
                    type="range"
                    className="form-range"
                    name="min"
                    min={0}
                    value={priceRange.min}
                    onChange={handleRangeChange}
                />
                <label className="mt-3">Max: {priceRange.max} €</label>
                <input
                    type="range"
                    className="form-range"
                    name="max"
                    min={priceRange.min}
                    max={1000}
                    value={priceRange.max}
                    onChange={handleRangeChange}
                />
            </div>
        </div>
    );
}
export default PriceFilter;