import { useState } from 'react';

const CategoryCombo = ({ categories, selectedFatherCat, selectedChildCat, handleCatsChange }) => {
    const [selectedOptions, setSelectedOptions] = useState(selectedFatherCat || []);
    const [selectedChildOptions, setSelectedChildOptions] = useState(selectedChildCat || []);

    const handleChange = (e) => {
        // Recupera gli ID delle categorie padre selezionate
        const parentIds = Array.from(e.target.selectedOptions).map(option => parseInt(option.value, 10));

        // Reset delle sotto-categorie selezionate se cambia la selezione delle categorie padre
        setSelectedChildOptions([]);

        // Combina le categorie padre selezionate (reset delle sotto-categorie)
        const updatedSelections = [...new Set(parentIds)];
        setSelectedOptions(parentIds);
        handleCatsChange(updatedSelections);
    };

    const handleChildChange = (e) => {
        // Recupera gli ID delle sotto-categorie selezionate
        const childIds = Array.from(e.target.selectedOptions).map(option => parseInt(option.value, 10));

        // Combina le categorie padre e figlio
        const updatedSelections = [...new Set([...selectedOptions, ...childIds])];
        setSelectedChildOptions(childIds);
        handleCatsChange(updatedSelections);
    };
    
    return (
        <>
            <div className="mb-3">
                <label htmlFor="categories" className="form-label fw-bold">Categorie</label>
                <select className="form-select" size="6" name="categories[]" id="categories"
                    multiple onChange={handleChange} value={selectedOptions}>
                    {
                        categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="categories" className="form-label fw-bold">Sotto categorie</label>
                {selectedOptions != '' ?
                    <select className="form-select" size="6" name="categories[]" id="categories"
                        multiple onChange={handleChildChange} value={selectedChildOptions}>
                        {
                            categories.map(cat => (
                                cat.children.filter(child =>
                                    selectedOptions.includes(child.parent_id)).map(child => (
                                        <option key={child.id} value={child.id}>{child.name}</option>
                                    ))
                            ))
                        }
                    </select>
                    : <p>Nessuna categoria selezionata</p>
                }
            </div>
        </>
    )
}

export default CategoryCombo;
