import { ButtonDelete, ButtonEdit, AlertErrors, CategoryDelete, CategoryDeleteSelected } from "@/components/Admin/Index";
import Layout from "@/Layouts/Admin/Layout"
import { useState, useEffect } from "react"
import { Link, useForm } from "@inertiajs/react";
import { BASE_URL } from '@/constants/constants'

const CategoriesContent = ({ categories, flash }) => {

    const { delete: formDelete } = useForm();
    const [message, setMessage] = useState(flash.message);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedParent, setSelectedParent] = useState('');
    const filteredChildren = categories.find(category => category.id === parseInt(selectedParent))?.children || [];

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

    const handleSelectAllCatChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const allRecordIds = categories.map(category => category.id);
        if (isChecked) {
            setSelectedRecords(allRecordIds);
        } else {
            setSelectedRecords([]);
        }
    };

    const handleSelectAllChildChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const allRecordIds = categories.flatMap(category =>
            category.children.map(child => child.id)
        );
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

            <div className="row">
                <div className="col-md-6">
                    <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa', height: '600px', overflow: 'scroll' }}>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">
                                                <div className="form-check d-flex justify-content-center align-items-center">
                                                    <input className="form-check-input" type="checkbox" value={selectAll}
                                                        onChange={handleSelectAllCatChange}
                                                        checked={selectAll} />
                                                </div>
                                            </th>
                                            <th scope="col">Id</th>
                                            <th scope="col">Categoria padre</th>
                                            <th scope="col" className="text-center">Operazioni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            categories.length > 0 ? (
                                                categories.map(category => (
                                                    <tr key={category.id} className="align-middle">
                                                        <th scope="row" className='col-md-2 py-1'>
                                                            <div className="form-check d-flex justify-content-center align-items-center">
                                                                <input className="form-check-input" type="checkbox" value={category.id}
                                                                    onChange={(e) => handleCheckboxChange(e, category.id)}
                                                                    checked={selectedRecords.includes(category.id)} />
                                                            </div>
                                                        </th>
                                                        <th scope="row" className='col-md-2 py-1'>{category.id}</th>
                                                        <td scope="row" className='col-md-4 py-1'>{category.name}</td>
                                                        <td scope="row" className="text-center col-md-4 py-1">
                                                            <Link href={route('categories.edit', category.id)} className="btn px-2">
                                                                <ButtonEdit url={BASE_URL} height={25} width={25} />
                                                            </Link>
                                                            <form onSubmit={handleDelete} className="d-inline" id={category.id}>
                                                                <ButtonDelete url={BASE_URL} height={25} width={25} />
                                                            </form>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan='4' className='text-center'>Non ci sono categorie</td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa', height: '600px', overflow: 'scroll' }}>
                        <div className="card-body">
                            <select name="cat" id="cat" className="form-select mb-3" value={selectedParent}
                                onChange={(e) => {
                                    setSelectedParent(e.target.value);
                                }}>
                                <option value=''>Seleziona una categoria</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {filteredChildren.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">
                                                    <div className="form-check d-flex justify-content-center align-items-center">
                                                        <input className="form-check-input" type="checkbox" value={selectAll}
                                                            onChange={handleSelectAllChildChange}
                                                            checked={selectAll} />
                                                    </div>
                                                </th>
                                                <th scope="col">Id</th>
                                                <th scope="col">Sotto-categoria</th>
                                                <th scope="col" className="text-center">Operazioni</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredChildren.map(child => (
                                                <tr key={child.id} className="align-middle">
                                                    <th scope="row" className='col-md-2 py-1'>
                                                        <div className="form-check d-flex justify-content-center align-items-center">
                                                            <input className="form-check-input" type="checkbox" value={child.id}
                                                                onChange={(e) => handleCheckboxChange(e, child.id)}
                                                                checked={selectedRecords.includes(child.id)} />
                                                        </div>
                                                    </th>
                                                    <th scope="row" className='col-md-2 py-1'>{child.id}</th>
                                                    <td scope="row" className='col-md-4 py-1'>{child.name}</td>
                                                    <td scope="row" className="text-center col-md-4 py-1">
                                                        <Link href={route('categories.edit', child.id)} className="btn px-2">
                                                            <ButtonEdit url={BASE_URL} height={25} width={25} />
                                                        </Link>
                                                        <form onSubmit={handleDelete} className="d-inline" id={child.id}>
                                                            <ButtonDelete url={BASE_URL} height={25} width={25} />
                                                        </form>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className='d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
                                    <span className='text-center'>Nessuna categoria figlio</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoriesContent