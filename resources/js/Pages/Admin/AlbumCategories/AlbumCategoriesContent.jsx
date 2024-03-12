import { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from "@/Layouts/Admin/Layout";
import Pagination from '@/components/Admin/Pagination';
import AlertErrors from '@/components/Admin/AlertErrors';
import { BASE_URL } from "@/constants/constants";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AlbumCategoriesContent = ({ albumCategories, flash, user_auth }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const albumCategoryId = e.target.id;
        if (albumCategoryId) {
            MySwal.fire({
                title: "Sei sicuro di voler eliminare questa categoria?",
                text: "Non sarà possibile annullare questa operazione!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--bs-cobalto)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, elimina!",
                cancelButtonText: "Annulla",
            }).then((result) => {
                if (result.isConfirmed) {
                    formDelete(route('categories.destroy', albumCategoryId), {
                        onSuccess: () => {
                            setMessage({ tipo: 'success', testo: `Categoria ${albumCategoryId} cancellata correttamente` });
                        },
                        onError: () => {
                            setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione della categoria ${albumCategoryId}` });
                        }
                    });
                }
            })
        }
    }

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

    const handleDeleteSelected = (e) => {
        e.preventDefault();
        if (selectedRecords.length === 0) {
            setMessage({ tipo: 'danger', testo: 'Nessuna categoria selezionata' });
            return;
        }
        if (selectedRecords.length > 0) {
            MySwal.fire({
                title: "Sei sicuro di voler eliminare queste categorie?",
                text: "Non sarà possibile annullare questa operazione!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--bs-cobalto)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, elimina!",
                cancelButtonText: "Annulla",
            }).then((result) => {
                if (result.isConfirmed) {
                    formDelete(route('categories.destroy.batch', { recordIds: selectedRecords }), {
                        onSuccess: () => {
                            setSelectedRecords([]);
                            setSelectAll(false);
                            if (selectedRecords.length === 1) {
                                setMessage({ tipo: 'success', testo: `Categoria selezionata cancellata correttamente` });
                            } else {
                                setMessage({ tipo: 'success', testo: `Categorie selezionate cancellate correttamente` });
                            }
                        },
                        onError: () => {
                            setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione delle categorie` });
                        }
                    });
                }
            })
        }
    }

    return (
        <Layout user_auth={user_auth}>
            <h2>Lista categorie albums</h2>

            <AlertErrors message={message} />

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link href={route('categories.create')} className="btn cb-primary mb-3">Inserisci nuova categoria</Link>
                {selectedRecords && selectedRecords.length > 0 &&
                    <button className='btn btn-danger mb-3 me-3' onClick={handleDeleteSelected}>Elimina selezionati</button>
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
                                        <tr key={cat.id}>
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
                                                <Link href={route('categories.edit', cat.id)} className="btn px-2">
                                                    <div className="over-icon">
                                                        <img src={`${BASE_URL}img/icons/edit.png`} alt="edit" width={40} className='original' />
                                                        <img src={`${BASE_URL}img/icons/edit-over.png`} alt="edit" width={40} className='overized' />
                                                    </div>
                                                </Link>
                                                <form onSubmit={handleSubmit} method="post"
                                                    className="d-inline" id={cat.id}>
                                                    <button className="btn px-2">
                                                        <div className="over-icon">
                                                            <img src={`${BASE_URL}img/icons/delete.png`} alt="delete" width={40} className='original' />
                                                            <img src={`${BASE_URL}img/icons/delete-over.png`} alt="delete" width={40} className='overized' />
                                                        </div>
                                                    </button>
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