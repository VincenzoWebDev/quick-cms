import Layout from "@/Layouts/Admin/Layout";
import AlertErrors from "@/components/Admin/AlertErrors";
import { useEffect, useState } from 'react';
import { Link, useForm, router } from "@inertiajs/react";
import { BASE_URL } from '@/constants/constants';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const PageContent = ({ pages, flash, user_auth }) => {
    const [message, setMessage] = useState(flash.message);
    const { delete: formDelete } = useForm();
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleSwitchChange = (e) => {
        e.preventDefault();
        const pageId = e.target.dataset.pageId;
        const active = e.target.checked ? 1 : 0;
        // Invia una richiesta al server per aggiornare lo stato del tema
        router.post(route('pages.switch', pageId), { active }, {
            onSuccess: () => {
                if (active) {
                    setMessage({ tipo: 'success', testo: `Pagina ${pageId} attivata correttamente` });
                } else {
                    setMessage({ tipo: 'success', testo: `Pagina ${pageId} disattivata correttamente` });
                }
            },
            onError: (error) => {
                setMessage({ tipo: 'danger', testo: error.message });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const pageId = e.target.id;
        if (pageId) {
            MySwal.fire({
                title: "Sei sicuro di voler eliminare questa pagina?",
                text: "Non sarà possibile annullare questa operazione!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--bs-cobalto)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, elimina!",
                cancelButtonText: "Annulla",
            }).then((result) => {
                if (result.isConfirmed) {
                    formDelete(route('pages.destroy', pageId), {
                        onSuccess: () => {
                            setMessage({ tipo: 'success', testo: `Pagina ${pageId} cancellata correttamente` });
                        },
                        onError: () => {
                            setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione della pagina ${pageId}` });
                        }
                    });
                }
            })
        }
    }

    const handleCheckboxChange = (e, pageId) => {
        if (e.target.checked) {
            setSelectedRecords(prevSelectedRecords => [...prevSelectedRecords, pageId]);
        } else {
            setSelectedRecords(prevSelectedRecords => prevSelectedRecords.filter(id => id !== pageId));
        }
    };

    const handleSelectAllChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const allRecordIds = pages.data.map(page => page.id);
        if (isChecked) {
            setSelectedRecords(allRecordIds);
        } else {
            setSelectedRecords([]);
        }
    };

    const handleDeleteSelected = (e) => {
        e.preventDefault();
        if (selectedRecords.length === 0) {
            setMessage({ tipo: 'danger', testo: 'Nessuna pagina selezionata' });
            return;
        }
        if (selectedRecords.length > 0) {
            MySwal.fire({
                title: "Sei sicuro di voler eliminare queste pagine?",
                text: "Non sarà possibile annullare questa operazione!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--bs-cobalto)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, elimina!",
                cancelButtonText: "Annulla",
            }).then((result) => {
                if (result.isConfirmed) {
                    formDelete(route('pages.destroy.batch', { recordIds: selectedRecords }), {
                        onSuccess: () => {
                            setSelectedRecords([]);
                            setSelectAll(false);
                            if (selectedRecords.length === 1) {
                                setMessage({ tipo: 'success', testo: `Pagina selezionata cancellata correttamente` });
                            } else {
                                setMessage({ tipo: 'success', testo: `Pagine selezionate cancellate correttamente` });
                            }
                        },
                        onError: () => {
                            setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione delle pagine` });
                        }
                    });
                }
            })
        }
    }
    
    return (
        <Layout user_auth={user_auth}>
            <h2>Gestione pagine</h2>
            <AlertErrors message={message} />

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link href={route('pages.create')} className="btn cb-primary mb-3">Inserisci nuova pagina</Link>
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
                                    <th scope="col">Titolo pagina</th>
                                    <th scope="col">Descrizione pagina</th>
                                    <th scope="col">Layout</th>
                                    <th scope="col">Stato</th>
                                    <th scope="col">Creato il</th>
                                    <th scope="col">Aggiornato il</th>
                                    <th scope="col" className="text-center">Operazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pages.data.length > 0 ? (
                                    pages.data.map(page => (
                                        <tr key={page.id}>
                                            <th scope="row" className='col-md-1'>
                                                <div className="form-check d-flex justify-content-center align-items-center">
                                                    <input className="form-check-input" type="checkbox" value={page.id}
                                                        onChange={(e) => handleCheckboxChange(e, page.id)}
                                                        checked={selectedRecords.includes(page.id)} />
                                                </div>
                                            </th>
                                            <th scope="row" className='col-md-1'>{page.id}</th>
                                            <td scope="row">{page.title}</td>
                                            <td scope="row">{page.meta_description}</td>
                                            <td scope="row">{page.layout.name}</td>
                                            <td scope="row">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input page-switch" type="checkbox" role="switch"
                                                        id={`flexSwitchCheckDefault${page.id}`} style={{ width: '40px', height: '20px' }}
                                                        data-page-id={page.id} checked={page.active === 1} onChange={handleSwitchChange} />
                                                </div>
                                            </td>
                                            <td scope="row">{new Date(page.created_at).toLocaleDateString()}</td>
                                            <td scope="row">{new Date(page.updated_at).toLocaleDateString()}</td>
                                            <td scope="row" className="text-center">
                                                <Link href={route('pages.edit', page.id)} className="btn px-2">
                                                    <div className="over-icon">
                                                        <img src={`${BASE_URL}img/icons/edit.png`} alt="edit" width={40} className="original" />
                                                        <img src={`${BASE_URL}img/icons/edit-over.png`} alt="edit" width={40} className='overized' />
                                                    </div>
                                                </Link>
                                                <form onSubmit={handleSubmit} className="d-inline"
                                                    id={page.id}>
                                                    <button className="btn px-2">
                                                        <div className="over-icon">
                                                            <img src={`${BASE_URL}img/icons/delete.png`} alt="delete" width={40} className="original" />
                                                            <img src={`${BASE_URL}img/icons/delete-over.png`} alt="delete" width={40} className='overized' />
                                                        </div>
                                                    </button>
                                                </form>
                                                <a href={route('page.show', page.slug)} className="btn px-2" target="_blank">
                                                    <div className="over-icon">
                                                        <img src={`${BASE_URL}img/icons/view.png`} alt="view" width={40} className="original" />
                                                        <img src={`${BASE_URL}img/icons/view-over.png`} alt="view" width={40} className='overized' />
                                                    </div>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan='8' className="text-center">Non ci sono pagine</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout >
    );
}

export default PageContent;