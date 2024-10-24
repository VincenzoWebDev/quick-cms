import { useEffect, useState } from "react";
import TableCombinations from "./TableCombinations";

const VariantsTab = ({ variants, setVariantCombinations, combinationValues }) => {
    const [visibleVariants, setVisibleVariants] = useState([]);
    const [selectedValues, setSelectedValues] = useState({});
    const [combinations, setCombinations] = useState([]);

    // Funzione per gestire la selezione delle varianti
    const handleVariantClick = (variantId) => {
        setVisibleVariants(prev =>
            prev.includes(variantId) ? prev.filter(id => id !== variantId) : [...prev, variantId]
        );
    };

    // Gestione del cambiamento dei valori selezionati
    const handleValueChange = (variantId, value) => {
        setSelectedValues(prevValues => {
            const updatedVariantValues = prevValues[variantId]?.includes(value)
                ? prevValues[variantId].filter(v => v.id !== value.id) // Rimuovi se già selezionato
                : [...(prevValues[variantId] || []), value]; // Aggiungi se non selezionato

            // Se nessun valore è selezionato per la variante, rimuovi la chiave
            if (updatedVariantValues.length === 0) {
                const { [variantId]: _, ...rest } = prevValues;
                return rest;
            }

            return {
                ...prevValues,
                [variantId]: updatedVariantValues
            };
        });
    };

    // Funzione per generare le combinazioni
    const generateCombinations = () => {
        let newCombinations = [];

        const selectedVariants = Object.keys(selectedValues);
        if (selectedVariants.length === 0) {
            setCombinations([]); // Nessuna combinazione se non ci sono valori selezionati
            return;
        }

        // Funzione ricorsiva per generare combinazioni
        const generateRecursive = (prefix, variantIndex) => {
            if (variantIndex === selectedVariants.length) {
                newCombinations.push({
                    ...prefix,
                    price: '',      // Campo predefinito
                    sku: '',        // Campo predefinito
                    ean: '',        // Campo predefinito
                    quantity: '',   // Campo predefinito
                });
                return;
            }

            const currentVariantId = selectedVariants[variantIndex];
            selectedValues[currentVariantId].forEach(value => {
                generateRecursive({ ...prefix, [`variant_${currentVariantId}`]: value.value }, variantIndex + 1);
            });
        };

        generateRecursive({}, 0);
        setCombinations(newCombinations);
    };

    // Gestione del cambiamento delle combinazioni
    const handleInputCombinationChange = (index, field, value) => {
        setCombinations(prevCombinations => {
            const newCombinations = prevCombinations.map((combination, i) => {
                if (i === index) {
                    return {
                        ...combination,
                        [field]: value,
                    };
                }
                return combination;
            });
            return newCombinations;
        });
    };

    // Effetto per sincronizzare le combinazioni con il componente padre
    useEffect(() => {
        setVariantCombinations(combinations);
    }, [combinations]);

    return (
        <div className={`tab-pane fade show`} id="variants-tab-pane" role="tabpanel" aria-labelledby="variants-tab" tabIndex="0">
            <div className="mb-3">
                <label htmlFor="variants" className="form-label fw-bold">Varianti</label>
                <div className="row">
                    {variants.map((variant) => (
                        <div key={variant.id} className="col-4">
                            <div className="mb-3">
                                <label>
                                    <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        name="variants"
                                        onChange={() => handleVariantClick(variant.id)}
                                        checked={visibleVariants.includes(variant.id)}
                                    />
                                    {variant.name}
                                </label>
                            </div>
                            {visibleVariants.includes(variant.id) && (
                                <div>
                                    <label htmlFor="variant_values" className="form-label fw-bold">Disponibili</label>
                                    {variant.values.map((value) => (
                                        <div key={value.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="variant_values"
                                                    value={value.id}
                                                    className="form-check-input me-2"
                                                    onChange={() => handleValueChange(variant.id, value)}
                                                    checked={selectedValues[variant.id]?.includes(value) || false}
                                                />
                                                {value.value}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottone per generare combinazioni */}
                {visibleVariants.length > 0 && (
                    <input type="button" onClick={generateCombinations} value="Genera combinazioni" className="btn btn-success my-3" />
                )}

                {/* Tabella delle combinazioni */}
                {Object.keys(selectedValues).length > 0 &&
                    combinations.length > 0 && (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    {Object.keys(selectedValues).map(variantId => (
                                        <th key={variantId}>
                                            {variants.find(variant => variant.id === parseInt(variantId))?.name}
                                        </th>
                                    ))}
                                    <th>Prezzo</th>
                                    <th>SKU</th>
                                    <th>EAN</th>
                                    <th>Quantità</th>
                                </tr>
                            </thead>
                            <tbody>
                                {combinations.map((combination, index) => (
                                    <tr key={index} className="align-middle">
                                        {Object.keys(selectedValues).map(variantId => (
                                            <td key={variantId} className="col-1">
                                                {combination[`variant_${variantId}`] || 'N/A'}
                                            </td>
                                        ))}
                                        <td className="col-2">
                                            <input
                                                className="form-control w-100"
                                                type="text"
                                                value={combination.price || ''}
                                                onChange={(e) => handleInputCombinationChange(index, 'price', e.target.value)}
                                            />
                                        </td>
                                        <td className="col-2">
                                            <input
                                                className="form-control w-100"
                                                type="text"
                                                value={combination.sku || ''}
                                                onChange={(e) => handleInputCombinationChange(index, 'sku', e.target.value)}
                                            />
                                        </td>
                                        <td className="col-2">
                                            <input
                                                className="form-control w-100"
                                                type="text"
                                                value={combination.ean || ''}
                                                onChange={(e) => handleInputCombinationChange(index, 'ean', e.target.value)}
                                            />
                                        </td>
                                        <td className="col-2">
                                            <input
                                                className="form-control w-100"
                                                type="number"
                                                value={combination.quantity || 0}
                                                onChange={(e) => handleInputCombinationChange(index, 'quantity', e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                <TableCombinations combinationValues={combinationValues} />
            </div>
        </div >
    );
};

export default VariantsTab;
