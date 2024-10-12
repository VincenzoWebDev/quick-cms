import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVariantCombinations } from "../../../redux/productSlice";
import TableCombinations from "./TableCombinations";

const VariantsTab = ({ variants, variantColors, variantSizes, variantCombinationsGroup }) => {
    const dispatch = useDispatch();
    const [visibleVariants, setVisibleVariants] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [combinations, setCombinations] = useState([]);

    // Funzione per gestire la selezione delle varianti
    const handleVariantClick = (variantId) => {
        setVisibleVariants(prev =>
            prev.includes(variantId) ? prev.filter(id => id !== variantId) : [...prev, variantId]
        );
    };

    const handleColorChange = (color) => {
        setSelectedColors(prevColors =>
            prevColors.includes(color)
                ? prevColors.filter(c => c !== color) // Rimuovi se già selezionato
                : [...prevColors, color] // Aggiungi se non selezionato
        );
    };

    const handleSizeChange = (size) => {
        setSelectedSizes(prevSizes =>
            prevSizes.includes(size)
                ? prevSizes.filter(s => s !== size)
                : [...prevSizes, size]
        );
    }

    const generateCombinations = () => {
        let newCombinations = [];

        selectedColors.forEach((color) => {
            selectedSizes.forEach((size) => {
                newCombinations.push({
                    color: color.value,
                    color_id: color.id,
                    size: size.value,
                    size_id: size.id,
                    price: '',
                    sku: '',
                    ean: '',
                    quantity: 0,
                });
            });
        });
        setCombinations(newCombinations);
    }

    const handleInputCombinationChange = (index, field, value) => {
        setCombinations(prevCombinations => {
            // Crea una copia immutabile delle combinazioni
            const newCombinations = prevCombinations.map((combination, i) => {
                if (i === index) {
                    // Crea una nuova copia dell'oggetto combinazione
                    return {
                        ...combination,
                        [field]: value,
                    };
                }
                return combination;
            });
            return newCombinations;
        });
    }

    useEffect(() => {
        dispatch(setVariantCombinations(combinations));
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
                                    {variant.id === 1 ? variantColors
                                        .filter((value) => value.product_variant_id === variant.id)
                                        .map((value) => (
                                            <div key={value.id}>
                                                <label>
                                                    <input type="checkbox" name="variant_values" value={value.id} className="form-check-input me-2" onChange={() => handleColorChange(value)} />
                                                    {value.value}
                                                </label>
                                            </div>
                                        )) : variant.id === 2 ? variantSizes
                                            .filter((value) => value.product_variant_id === variant.id)
                                            .map((value) => (
                                                <div key={value.id}>
                                                    <label>
                                                        <input type="checkbox" name="variant_values" value={value.id} className="form-check-input me-2" onChange={() => handleSizeChange(value)} />
                                                        {value.value}
                                                    </label>
                                                </div>
                                            )) : null}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {visibleVariants.length > 0 && <><input type="button" onClick={generateCombinations} value="Genera combinazioni" className="btn btn-success my-3" /> <br /></>}
                {combinations.length > 0 && (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Colore</th>
                                <th>Taglia</th>
                                <th>Prezzo</th>
                                <th>SKU</th>
                                <th>EAN</th>
                                <th>Quantità</th>
                            </tr>
                        </thead>
                        <tbody>
                            {combinations.map((combination, index) => (
                                <tr key={index} className="align-middle">
                                    <td className="col-1">{combination.color}</td>
                                    <td className="col-1">{combination.size}</td>
                                    <td className="col-2">
                                        <input
                                            className="form-control w-100"
                                            type="text"
                                            value={combination.price}
                                            onChange={(e) => handleInputCombinationChange(index, 'price', e.target.value)}
                                        />
                                    </td>
                                    <td className="col-2">
                                        <input
                                            className="form-control w-100"
                                            type="text"
                                            value={combination.sku}
                                            onChange={(e) => handleInputCombinationChange(index, 'sku', e.target.value)}
                                        />
                                    </td>
                                    <td className="col-2">
                                        <input
                                            className="form-control w-100"
                                            type="text"
                                            value={combination.ean}
                                            onChange={(e) => handleInputCombinationChange(index, 'ean', e.target.value)}
                                        />
                                    </td>
                                    <td className="col-2">
                                        <input
                                            className="form-control w-100"
                                            type="number"
                                            value={combination.quantity}
                                            onChange={(e) => handleInputCombinationChange(index, 'quantity', e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <TableCombinations variantCombinationsGroup={variantCombinationsGroup} />
            </div>
        </div >
    )
}

export default VariantsTab;