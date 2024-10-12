import { ButtonDelete, ButtonEdit, AlertErrors, CategoryDelete, CategoryDeleteSelected } from "@/components/Admin";
import Layout from "@/Layouts/Admin/Layout"
import { useState, useEffect } from "react"
import { usePage, Link, useForm } from "@inertiajs/react";
import { STORAGE_URL, BASE_URL } from '@/constants/constants'

const CategoriesContent = ({ categories, flash }) => {

    const { delete: formDelete } = useForm();
    const [message, setMessage] = useState(flash.message);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    // const MySwal = withReactContent(Swal);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleCheckboxChange = (e, categoryId) => {
        if (e.target.checked) {
            setSelectedRecords(prevSelectedRecords => [...prevSelectedRecords, categoryId]);
        } else {
            setSelectedRecords(prevSelectedRecords => prevSelectedRecords.filter(id => id !== categoryId));
        }
    };

    const handleSelectAllChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const allRecordIds = categories.map(category => category.id);
        if (isChecked) {
            setSelectedRecords(allRecordIds);
        } else {
            setSelectedRecords([]);
        }
    };

    // funzione per eliminare una categoria
    const handleDelete = (e) => {
        CategoryDelete({ e, formDelete, setMessage })
    }

    // funzione per eliminare le categorie selezionate
    const handleDeleteSelected = (e) => {
        CategoryDeleteSelected({ e, formDelete, setMessage, selectedRecords, setSelectedRecords, setSelectAll })
    }

    return (
        <Layout>
            <h2>Categorie</h2>
            <AlertErrors message={message} />

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link href={route('categories.create')} className="btn cb-primary mb-3">Inserisci una nuova categoria</Link>
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
                                    <th scope="col">Nome categoria</th>
                                    <th scope="col">Descrizione</th>
                                    <th scope="col" className="text-center">Operazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.length > 0 ? (
                                        categories.map(category => (
                                            <tr key={category.id} className="align-middle">
                                                <th scope="row" className='col-md-1'>
                                                    <div className="form-check d-flex justify-content-center align-items-center">
                                                        <input className="form-check-input" type="checkbox" value={category.id}
                                                            onChange={(e) => handleCheckboxChange(e, category.id)}
                                                            checked={selectedRecords.includes(category.id)} />
                                                    </div>
                                                </th>
                                                <th scope="row" className='col-md-2'>{category.id}</th>
                                                <td scope="row" className='col-md-3'>{category.name}</td>
                                                <td scope="row" className='col-md-3'>{category.description}</td>
                                                <td scope="row" className="text-center col-md-3">
                                                    <Link href={route('categories.edit', category.id)} className="btn px-2">
                                                        <ButtonEdit url={BASE_URL} />
                                                    </Link>
                                                    <form onSubmit={handleDelete} className="d-inline" id={category.id}>
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

export default CategoriesContent