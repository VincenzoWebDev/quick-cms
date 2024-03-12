import Layout from "@/Layouts/Admin/Layout";
import { Link, useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AlertErrors from '@/components/Admin/AlertErrors';
import { BASE_URL } from "@/constants/constants";

const ThemesContent = ({ themes, flash, user_auth }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const themeId = e.target.id;
        formDelete(route('themes.destroy', themeId), {
            onSuccess: () => {
                setMessage({ tipo: 'success', testo: `Tema ${themeId} cancellato correttamente` });
            },
            onError: () => {
                setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione del tema ${themeId}` });
            }
        });
    }

    const handleSwitchChange = (e) => {
        e.preventDefault();
        const themeId = e.target.dataset.themeId;
        const active = e.target.checked ? 1 : 0;
        // Invia una richiesta al server per aggiornare lo stato del tema
        router.post(route('themes.switch', themeId), { active }, {
            onSuccess: () => {
                if (active) {
                    setMessage({ tipo: 'success', testo: `Tema ${themeId} attivato correttamente` });
                } else {
                    setMessage({ tipo: 'success', testo: `Tema ${themeId} disattivato correttamente` });
                }
            },
            onError: (error) => {
                setMessage({ tipo: 'danger', testo: error.message });
            }
        });
    };

    const handleCheckboxChange = (e, themeId) => {
        if (e.target.checked) {
            setSelectedRecords(prevSelectedRecords => [...prevSelectedRecords, themeId]);
        } else {
            setSelectedRecords(prevSelectedRecords => prevSelectedRecords.filter(id => id !== themeId));
        }
    };

    const handleSelectAllChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const allRecordIds = themes.map(theme => theme.id);
        if (isChecked) {
            setSelectedRecords(allRecordIds);
        } else {
            setSelectedRecords([]);
        }
    };

    const handleDeleteSelected = (e) => {
        e.preventDefault();
        if (selectedRecords.length === 0) {
            setMessage({ tipo: 'danger', testo: 'Nessun tema selezionato' });
            return;
        }
        formDelete(route('themes.destroy.batch', { recordIds: selectedRecords }), {
            onSuccess: () => {
                setSelectedRecords([]);
                setSelectAll(false);
                if (selectedRecords.length === 1) {
                    setMessage({ tipo: 'success', testo: `Tema selezionato cancellato correttamente` });
                } else {
                    setMessage({ tipo: 'success', testo: `Temi selezionati cancellati correttamente` });
                }
            },
            onError: () => {
                setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione dei temi` });
            }
        });
    }

    return (
        <Layout user_auth={user_auth}>
            <h2>Gestione temi</h2>
            <AlertErrors message={message} />

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link href={route('themes.create')} className="btn cb-primary mb-3">Inserisci nuovo tema</Link>
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
                                    <th scope="col">Nome team</th>
                                    <th scope="col">Stato</th>
                                    <th scope="col">Operazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    themes.map((theme) => {
                                        return (
                                            <tr key={theme.id}>
                                                <th scope="row" className='col-md-1'>
                                                    <div className="form-check d-flex justify-content-center align-items-center">
                                                        <input className="form-check-input" type="checkbox" value={theme.id}
                                                            onChange={(e) => handleCheckboxChange(e, theme.id)}
                                                            checked={selectedRecords.includes(theme.id)} />
                                                    </div>
                                                </th>
                                                <th scope="row" className='col-md-2'>{theme.id}</th>
                                                <td className='col-md-3'>{theme.name}</td>
                                                <td scope="row">
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch"
                                                            id={`flexSwitchCheckDefault${theme.id}`} style={{ width: '40px', height: '20px' }}
                                                            data-theme-id={theme.id} checked={theme.active === 1} onChange={handleSwitchChange} />
                                                    </div>
                                                </td>
                                                <td className='col-md-3'>
                                                    <Link href={route('themes.edit', theme.id)} className="btn px-2">
                                                        <div className="over-icon">
                                                            <img src={`${BASE_URL}img/icons/edit.png`} alt="edit" width={40} className="original" />
                                                            <img src={`${BASE_URL}img/icons/edit-over.png`} alt="edit" width={40} className='overized' />
                                                        </div>
                                                    </Link>
                                                    <form onSubmit={handleSubmit} id={theme.id} className='d-inline'>
                                                        <button className="btn px-2">
                                                            <div className="over-icon">
                                                                <img src={`${BASE_URL}img/icons/delete.png`} alt="delete" width={40} className="original" />
                                                                <img src={`${BASE_URL}img/icons/delete-over.png`} alt="delete" width={40} className='overized' />
                                                            </div>
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default ThemesContent;