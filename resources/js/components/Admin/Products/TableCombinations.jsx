import { Link, router, useForm } from "@inertiajs/react";
import { BASE_URL } from "@/constants/constants";
import React, { useEffect, useState } from "react";
import { CombinationsDelete, CombinationsDeleteSelected } from "./CombinationsDelete";
import AlertErrors from "../AlertErrors";
import { ButtonEdit, ButtonCancel, ButtonSave } from "../Index";

const TableCombinations = React.memo(({ combinationValues }) => {
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [message, setMessage] = useState(null);
    const [editingCombination, setEditingCombination] = useState(null);
    const [editedCombination, setEditedCombination] = useState({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    const handleCheckboxChange = (e, combinationId) => {
        if (e.target.checked) {
            setSelectedRecords(prevSelectedRecords => [...prevSelectedRecords, combinationId]);
        } else {
            setSelectedRecords(prevSelectedRecords => prevSelectedRecords.filter(id => id !== combinationId));
        }
    };

    const handleSelectAllChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const allRecordIds = combinationValues.map(combination => combination.id);
        if (isChecked) {
            setSelectedRecords(allRecordIds);
        } else {
            setSelectedRecords([]);
        }
    };

    const handleDeleteCombination = (combinationId) => {
        CombinationsDelete({ combinationId });
    }
    const handleDeleteSelected = (e) => {
        CombinationsDeleteSelected({ e, setMessage, selectedRecords, setSelectedRecords, setSelectAll });
    }

    const handleEditClick = (combination) => {
        setEditingCombination(combination.id);
        setEditedCombination({ ...combination });
    }
    const handleEditCombination = (combination) => {
        router.patch(route('products.update.combination', combination.id), combination,
            {
                onSuccess: () => {
                    setMessage({ tipo: 'success', testo: "Combinazione aggiornata correttamente" });
                    setEditingCombination(null);
                    setEditedCombination({});
                },
                onError: () => {
                    setMessage({ tipo: 'danger', testo: "Combinazione non aggiornata correttamente" });
                    setEditingCombination(null);
                    setEditedCombination({});
                }
            });
    }
    return (
        <>
            {!combinationValues ? null :
                combinationValues.length > 0 && (
                    <>
                        <AlertErrors message={message} />
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-3 align-items-center">
                            <span className="fw-bold my-2">Combinazioni</span>
                            {selectedRecords && selectedRecords.length > 0 &&
                                <button className='btn btn-danger py-1 px-2' onClick={handleDeleteSelected}>Elimina selezionati</button>
                            }
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="form-check d-flex justify-content-center align-items-center">
                                            <input className="form-check-input" type="checkbox" value={selectAll}
                                                onChange={handleSelectAllChange}
                                                checked={selectAll} />
                                        </div>
                                    </th>
                                    <th>Variante</th>
                                    <th>Prezzo</th>
                                    <th>SKU</th>
                                    <th>EAN</th>
                                    <th>Quantità</th>
                                    <th className="text-center">Operazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {combinationValues.map((combination, index) => (
                                    <tr key={index} className="align-middle">
                                        <th scope="row" className='col-md-1'>
                                            <div className="form-check d-flex justify-content-center align-items-center">
                                                <input className="form-check-input" type="checkbox" value={combination.combination_id}
                                                    onChange={(e) => handleCheckboxChange(e, combination.combination_id)}
                                                    checked={selectedRecords.includes(combination.combination_id)} />
                                            </div>
                                        </th>
                                        <td className="col-2">
                                            <input
                                                type="text"
                                                className="form-control w-100"
                                                value={combination.variant_combination_values
                                                    .map((variantValue) => variantValue.product_variant_value.value) // Mappa i valori delle varianti
                                                    .join(", ")} // Unisce i valori con una virgola
                                                disabled
                                            />
                                        </td>
                                        {editingCombination === combination.id ? (
                                            <>
                                                <td className="col-1">
                                                    <input
                                                        type="text"
                                                        className="form-control w-100"
                                                        value={editedCombination.price || ''}
                                                        onChange={(e) => setEditedCombination({ ...editedCombination, price: e.target.value })}
                                                    />
                                                </td>
                                                <td className="col-2">
                                                    <input
                                                        type="text"
                                                        className="form-control w-100"
                                                        value={editedCombination.sku || ''}
                                                        onChange={(e) => setEditedCombination({ ...editedCombination, sku: e.target.value })}
                                                    />
                                                </td>
                                                <td className="col-2">
                                                    <input
                                                        type="text"
                                                        className="form-control w-100"
                                                        value={editedCombination.ean || ''}
                                                        onChange={(e) => setEditedCombination({ ...editedCombination, ean: e.target.value })}
                                                    />
                                                </td>
                                                <td className="col-1">
                                                    <input
                                                        type="number"
                                                        className="form-control w-100"
                                                        value={editedCombination.quantity || ''}
                                                        onChange={(e) => setEditedCombination({ ...editedCombination, quantity: e.target.value })}
                                                    />
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="col-1">
                                                    <input type="text" className="form-control w-100 f-disabled" value={combination.price || ''} disabled />
                                                </td>
                                                <td className="col-2">
                                                    <input type="text" className="form-control w-100" value={combination.sku || ''} disabled />
                                                </td>
                                                <td className="col-2">
                                                    <input type="text" className="form-control w-100" value={combination.ean || ''} disabled />
                                                </td>
                                                <td className="col-1">
                                                    <input type="number" className="form-control w-100" value={combination.quantity || ''} disabled />
                                                </td>
                                            </>
                                        )}
                                        <td className="col-1 text-center">
                                            {editingCombination === combination.id ? (
                                                <>
                                                    <a onClick={() => handleEditCombination(editedCombination)} className="btn px-2">
                                                        <ButtonSave url={BASE_URL} />
                                                    </a>
                                                    <a onClick={() => setEditingCombination(null)} className="btn px-0">
                                                        <ButtonCancel url={BASE_URL} />
                                                    </a>
                                                </>
                                            ) : (
                                                <>
                                                    <a onClick={() => handleEditClick(combination)} className="btn px-2">
                                                        <ButtonEdit url={BASE_URL} />
                                                    </a>
                                                    <div className="over-icon btn" onClick={() => handleDeleteCombination(combination.id)}>
                                                        <img src={`${BASE_URL}/img/icons/delete.png`} alt="delete" className='original' />
                                                        <img src={`${BASE_URL}/img/icons/delete-over.png`} alt="delete" className='overized' />
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )
            }
        </>
    )
});

export default TableCombinations