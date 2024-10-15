import { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from "@/Layouts/Admin/Layout";
import { ButtonDelete, ButtonEdit, Pagination, AlertErrors, AlbumCategoryDelete, AlbumCategoryDeleteSelected } from '@/components/Admin/Index';
import { BASE_URL } from "@/constants/constants";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AlbumCategoriesContent = ({ albumCategories, flash }) => {
    const { delete: formDelete } = useForm();
    const [message, setMessage] = useState(flash.message);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleCheckboxChange = (e, catId) => {
        if (e.target.checked) {
            setSelectedRecords(prevSelectedRecords => [...prevSelectedRecords, catId]);
        } else {
            setSelectedRecords(prevSelectedRecords => prevSelectedRecords.filter(id => id !== catId));
        }
    };

    const handleSelectAllChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const allRecordIds = albumCategories.data.map(cat => cat.id);
        if (isChecked) {
            setSelectedRecords(allRecordIds);
        } else {
            setSelectedRecords([]);
        }
    };

    const handleDelete = (e) => {
        AlbumCategoryDelete({ e, formDelete, setMessage });
    }

    const handleDeleteSelected = (e) => {
        AlbumCategoryDeleteSelected({ e, formDelete, setMessage, selectedRecords, setSelectedRecords, setSelectAll });
    }

    return (
        <Layout>
            <h2>Lista categorie albums</h2>

            <AlertErrors message={message} />

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link href={route('album.categories.create')} className="btn cb-primary mb-3">Inserisci nuova categoria</Link>
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
                                    <th scope="col">Data creazione</th>
                                    <th scope="col">Data aggiornamento</th>
                                    <th scope="col">Numeri di album</th>
                                    <th scope="col" className="text-center">Operazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {albumCategories.data.length > 0 ? (
                                    albumCategories.data.map(cat => (
                                        <tr key={cat.id} className="align-middle">
                                            <th scope="row" className='col-md-1'>
                                                <div className="form-check d-flex justify-content-center align-items-center">
                                                    <input className="form-check-input" type="checkbox" value={cat.id}
                                                        onChange={(e) => handleCheckboxChange(e, cat.id)}
                                                        checked={selectedRecords.includes(cat.id)} />
                                                </div>
                                            </th>
                                            <th scope="row" className="col-md-1">{cat.id}</th>
                                            <td scope="row" className="col-md-2">{cat.category_name}</td>
                                            <td scope="row" className="col-md-2">{new Date(cat.created_at).toLocaleDateString()}</td>
                                            <td scope="row" className="col-md-2">{new Date(cat.updated_at).toLocaleDateString()}</td>
                                            <td scope="row" className="col-md-1">{cat.albums_count}</td>
                                            <td scope="row" className="text-center col-md-2">
                                                <Link href={route('album.categories.edit', cat.id)} className="btn px-2">
                                                    <ButtonEdit url={BASE_URL} />
                                                </Link>
                                                <form onSubmit={handleDelete} method="post" className="d-inline" id={cat.id}>
                                                    <ButtonDelete url={BASE_URL} />
                                                </form>
                                            </td>
                                        </tr>

                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan='7' className='text-center'>Non ci sono categorie</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination links={albumCategories.links} />
        </Layout>
    )
}

export default AlbumCategoriesContent;