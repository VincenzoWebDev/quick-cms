import { useState } from 'react';

const AlbumCategoryCombo = ({ categories, selectedCategory, handleCatsChange }) => {
    const [selectedOptions, setSelectedOptions] = useState(selectedCategory);

    const handleChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedOptions(selectedOptions);
        handleCatsChange(selectedOptions);
    }

    return (
        <>
            <div className="mb-3">
                <label htmlFor="categories" className="form-label fw-bold">Categorie</label>
                <select className="form-select" size="5" aria-label="Size 3 select example" name="categories[]" id="categories"
                    multiple onChange={handleChange} value={selectedOptions}>
                    {
                        categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}

export default AlbumCategoryCombo;
