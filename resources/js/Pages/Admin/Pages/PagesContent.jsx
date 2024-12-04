import Layout from "@/Layouts/Admin/Layout";
import { AlertErrors, ButtonDelete, ButtonEdit, ButtonShow, PageDelete, PageDeleteSelected } from "@/components/Admin/Index";
import { useEffect, useState } from 'react';
import { Link, useForm, router } from "@inertiajs/react";
import { BASE_URL } from '@/constants/constants';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PageContent = ({ pages, flash }) => {
    const [message, setMessage] = useState(flash.message);
    const { delete: formDelete } = useForm();
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

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
        router.post(route('pages.switch', { pageId }), { active }, {
            onSuccess: () => {
                // setMessage({ tipo: 'success', testo: `Pagina ${active === 0 ? 'disattivata' : 'attivata'} correttamente` });
                toast.success(`Pagina ${active === 0 ? 'disattivata' : 'attivata'} correttamente`);
            },
            onError: () => {
                // setMessage({ tipo: 'danger', testo: `Errore durante l'attivazione/disattivazione della pagina` });
                toast.error(`Errore durante l'attivazione/disattivazione della pagina`);
            }
        });
    };

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

    const handleDelete = (e) => {
        PageDelete({ e, formDelete, setMessage });
    }

    const handleDeleteSelected = (e) => {
        PageDeleteSelected({ e, formDelete, setMessage, selectedRecords, setSelectedRecords, setSelectAll });
    }

    return (
        <Layout>
            <h2>Gestione pagine</h2>
            <AlertErrors message={message} />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{
                    marginTop: '65px',
                }}
            />

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link href={route('pages.create')} className="btn cb-primary mb-3">Inserisci nuova pagina</Link>
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
                                        <tr key={page.id} className="align-middle">
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
                                                        data-page-id={page.id} checked={page.active} onChange={handleSwitchChange} />
                                                </div>
                                            </td>
                                            <td scope="row">{new Date(page.created_at).toLocaleDateString()}</td>
                                            <td scope="row">{new Date(page.updated_at).toLocaleDateString()}</td>
                                            <td scope="row" className="text-center">
                                                <Link href={route('pages.edit', page.id)} className="btn px-2">
                                                    <ButtonEdit url={BASE_URL} />
                                                </Link>
                                                <form onSubmit={handleDelete} className="d-inline" id={page.id}>
                                                    <ButtonDelete url={BASE_URL} />
                                                </form>
                                                <a href={route('page.show', page.slug)} className="btn px-2" target="_blank">
                                                    <ButtonShow url={BASE_URL} />
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan='9' className="text-center">Non ci sono pagine</td>
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