import Layout from "@/Layouts/Admin/Layout";
import { usePage, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { STORAGE_URL, BASE_URL } from '@/constants/constants'
import { ButtonDelete, Pagination, AlertErrors, ProductDelete, ProductDeleteSelected, ButtonEdit } from "@/components/Admin";

const ProductsContent = ({ products, flash }) => {
    const { delete: formDelete } = useForm();
    const [message, setMessage] = useState(flash.message);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleCheckboxChange = (e, productId) => {
        if (e.target.checked) {
            setSelectedRecords(prevSelectedRecords => [...prevSelectedRecords, productId]);
        } else {
            setSelectedRecords(prevSelectedRecords => prevSelectedRecords.filter(id => id !== productId));
        }
    };

    const handleSelectAllChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const allRecordIds = products.map(product => product.id);
        if (isChecked) {
            setSelectedRecords(allRecordIds);
        } else {
            setSelectedRecords([]);
        }
    };

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

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link href={route('products.create')} className="btn cb-primary mb-3">Inserisci un nuovo prodotto</Link>
                {selectedRecords && selectedRecords.length > 0 &&
                    <button className='btn btn-danger mb-3' onClick={handleDeleteSelected}>Elimina selezionati</button>
                }
            </div>

            <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                <div className="card-body">
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
                                    <th scope="col">Id</th>
                                    <th scope="col">Immagine</th>
                                    <th scope="col">Nome prodotto</th>
                                    <th scope="col">Prezzo</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col" className="text-center">Operazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.length > 0 ? (
                                        products.map(product => (
                                            <tr key={product.id} className="align-middle">
                                                <th scope="row" className='col-md-1'>
                                                    <div className="form-check d-flex justify-content-center align-items-center">
                                                        <input className="form-check-input" type="checkbox" value={product.id}
                                                            onChange={(e) => handleCheckboxChange(e, product.id)}
                                                            checked={selectedRecords.includes(product.id)} />
                                                    </div>
                                                </th>
                                                <th scope="row" className='col-md-1'>{product.id}</th>
                                                <td scope="row" className='col-md-2'>
                                                    <img src={`${BASE_URL}storage/${product.image_path}`} alt="product" width={60} key={product.id} />
                                                </td>
                                                <td scope="row" className='col-md-2'>{product.name}</td>
                                                <td scope="row" className='col-md-1'>{product.price}</td>
                                                <td scope="row" className='col-md-1'>{product.stock}</td>
                                                <td scope="row" className='col-md-1'>{product.categories.map(category => category.name).join(', ')}</td>
                                                <td scope="row" className="text-center col-md-3">
                                                    <Link href={route('products.edit', product.id)} className="btn px-2">
                                                        <ButtonEdit url={BASE_URL} />
                                                    </Link>
                                                    <form onSubmit={handleDelete} className="d-inline" id={product.id}>
                                                        <ButtonDelete url={BASE_URL} />
                                                    </form>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='9' className='text-center'>Non ci sono prodotti</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductsContent;