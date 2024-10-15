import Layout from "@/Layouts/Admin/Layout";
import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useState, useEffect, useCallback } from "react";
import { AlertErrors, ProductDelete, ProductDeleteSelected, SearchAndPerPageSelector, InputErrors, ProductRow, Pagination } from "@/components/Admin/Index";
import { useFilterHandlers } from "@/hooks/admin/useFilterHandlers";

const ProductsContent = ({ products, flash, sortBy, sortDirection, perPage, sortSearch }) => {
    const { delete: formDelete } = useForm();
    const [message, setMessage] = useState(flash.message);
    const { errors } = usePage().props;

    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState(sortSearch || '');
    const [currentPerPage, setCurrentPerPage] = useState(perPage);
    const [loading, setLoading] = useState(false);

    const { handleSearchChange, handlePerPageChange, handleSort, getSortIcon } = useFilterHandlers(
        'products.index', // qui passi solo il nome della rotta senza route()
        sortBy,
        sortDirection,
        currentPerPage,
        setCurrentPerPage,
        searchQuery,
        setSearchQuery,
        setLoading
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleCheckboxChange = useCallback((e, productId) => {
        if (e.target.checked) {
            setSelectedRecords(prevSelectedRecords => [...prevSelectedRecords, productId]);
        } else {
            setSelectedRecords(prevSelectedRecords => prevSelectedRecords.filter(id => id !== productId));
        }
    }, []);

    const handleSelectAllChange = useCallback((e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const allRecordIds = products.data.map(product => product.id);
        if (isChecked) {
            setSelectedRecords(allRecordIds);
        } else {
            setSelectedRecords([]);
        }
    }, [products]);

    const handleDelete = (e) => {
        ProductDelete({ e, formDelete, setMessage });
    }

    const handleDeleteSelected = (e) => {
        ProductDeleteSelected({ e, formDelete, setMessage, selectedRecords, setSelectedRecords, setSelectAll });
    }

    return (
        <Layout>
            <h2>Gestione prodotti</h2>
            <AlertErrors message={message} />
            <InputErrors errors={errors} />

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link href={route('products.create')} className="btn cb-primary mb-3">Inserisci un nuovo prodotto</Link>
                {selectedRecords && selectedRecords.length > 0 &&
                    <button className='btn btn-danger mb-3' onClick={handleDeleteSelected}>Elimina selezionati</button>
                }
            </div>

            <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                <div className="card-body">
                    <SearchAndPerPageSelector currentPerPage={currentPerPage} handlePerPageChange={handlePerPageChange} loading={loading} searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <div className="form-check d-flex justify-content-center align-items-center">
                                            <input className="form-check-input" type="checkbox" value={selectAll}
                                                onChange={handleSelectAllChange}
                                                checked={selectAll} />
                                        </div>
                                    </th>
                                    <th scope="col" onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>Id {getSortIcon('id')}</th>
                                    <th scope="col">Immagine</th>
                                    <th scope="col">Nome prodotto</th>
                                    <th scope="col" onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>Prezzo {getSortIcon('price')}</th>
                                    <th scope="col" onClick={() => handleSort('stock')} style={{ cursor: 'pointer' }}>Stock {getSortIcon('stock')}</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col" className="text-center">Operazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.data.length > 0 ? (
                                        products.data.map(product => (
                                            <ProductRow
                                                key={product.id}
                                                product={product}
                                                handleCheckboxChange={handleCheckboxChange}
                                                selectedRecords={selectedRecords}
                                                handleDelete={handleDelete}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='8' className='text-center'>Non ci sono prodotti</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination
                links={products.links}
                sortBy={sortBy}
                sortDirection={sortDirection}
                perPage={currentPerPage}
                q={searchQuery}
                rotta={'products.index'}
            />
        </Layout>
    )
}

export default ProductsContent;