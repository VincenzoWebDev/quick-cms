import { Link, useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Layout from '@/Layouts/Admin/Layout';
import Pagination from '@/components/Admin/Pagination';
import AlertErrors from '@/components/Admin/AlertErrors';
import { BASE_URL, STORAGE_URL } from '@/constants/constants';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const UsersContent = ({ users, flash, user_auth }) => {
    const { delete: formDelete, get } = useForm();
    const [message, setMessage] = useState(flash.message);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        // Esegui la ricerca sul backend quando il campo di ricerca cambia
        get(route('users.search', { q: value }), {
            preserveState: true
        });
    }

    const handleSortByChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
        get(route('users', { sortBy: value }), {
            preserveState: true
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = e.target.id;

        if (userId) {
            MySwal.fire({
                title: "Sei sicuro di voler eliminare questo utente?",
                text: "Non sarà possibile annullare questa operazione!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--bs-cobalto)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, elimina!",
                cancelButtonText: "Annulla",
            }).then((result) => {
                if (result.isConfirmed) {
                    formDelete(route('users.destroy', userId), {
                        onSuccess: () => {
                            setMessage({ tipo: 'success', testo: `Utente ${userId} cancellato correttamente` });
                        },
                        onError: () => {
                            setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione dell'utente ${userId}` });
                        }
                    });
                }
            });
        }
    }

    const handleCheckboxChange = (e, userId) => {
        if (e.target.checked) {
            setSelectedRecords(prevSelectedRecords => [...prevSelectedRecords, userId]);
        } else {
            setSelectedRecords(prevSelectedRecords => prevSelectedRecords.filter(id => id !== userId));
        }
    };

    const handleSelectAllChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const allRecordIds = users.data.map(user => user.id);
        if (isChecked) {
            setSelectedRecords(allRecordIds);
        } else {
            setSelectedRecords([]);
        }
    };

    const handleDeleteSelected = (e) => {
        e.preventDefault();
        if (selectedRecords.length === 0) {
            setMessage({ tipo: 'danger', testo: 'Nessun utente selezionato' });
            return;
        }
        if (selectedRecords.length > 0) {
            MySwal.fire({
                title: "Sei sicuro di voler eliminare questi utenti?",
                text: "Non sarà possibile annullare questa operazione!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--bs-cobalto)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, elimina!",
                cancelButtonText: "Annulla",
            }).then((result) => {
                if (result.isConfirmed) {
                    formDelete(route('users.destroy.batch', { recordIds: selectedRecords }), {
                        onSuccess: () => {
                            setSelectedRecords([]);
                            setSelectAll(false);
                            if (selectedRecords.length === 1) {
                                setMessage({ tipo: 'success', testo: `Utente selezionato cancellato correttamente` });
                            } else {
                                setMessage({ tipo: 'success', testo: `Utenti selezionati cancellati correttamente` });
                            }
                        },
                        onError: () => {
                            setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione degli utenti` });
                        }
                    });
                }
            })
        }
    }

    return (
        <Layout user_auth={user_auth}>
            <h2>Lista users</h2>
            <AlertErrors message={message} />

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link href={route('users.create')} className="btn cb-primary mb-3">Inserisci nuovo utente</Link>
                {selectedRecords && selectedRecords.length > 0 &&
                    <button className='btn btn-danger mb-3 me-3' onClick={handleDeleteSelected}>Elimina selezionati</button>
                }
            </div>

            <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                <div className="card-body">
                    <div className="row justify-content-between">
                        <div className='col-auto'>
                            <select className="form-select w-100" aria-label="Default select example" selected={sortBy} onChange={handleSortByChange}>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <div className='col-auto cont-searchInput'>
                            <input type="search" className="form-control mb-3" style={{ width: '200px', paddingRight: '40px' }} name="search" placeholder="Cerca utenti..."
                                value={searchQuery} onChange={handleSearchChange} />
                            <i className="fa-solid fa-magnifying-glass" id='searchIcon'></i>
                        </div>
                    </div>

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
                                    <th scope="col">Avatar</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Ruolo</th>
                                    <th scope="col">Creato il</th>
                                    <th scope="col">Aggiornato il</th>
                                    <th scope="col" className='text-center'>Operazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.data.map((user) => (
                                        <tr key={user.id}>
                                            <th scope="row" className='col-md-1'>
                                                <div className="form-check d-flex justify-content-center align-items-center">
                                                    <input className="form-check-input" type="checkbox" value={user.id}
                                                        onChange={(e) => handleCheckboxChange(e, user.id)}
                                                        checked={selectedRecords.includes(user.id)} />
                                                </div>
                                            </th>
                                            <th scope="row" className='col-md-1'>{user.id}</th>
                                            <td className='col-md-1'><img src={user.profile_img} width={80} alt={user.name} title={user.name} /></td>
                                            <td className='col-md-2'>{user.name}</td>
                                            <td className='col-md-2'>{user.email}</td>
                                            <td className='col-md-1'>{user.role}</td>
                                            <td className='col-md-1'>{new Date(user.created_at).toLocaleDateString()}</td>
                                            <td className='col-md-1'>{new Date(user.updated_at).toLocaleDateString()}</td>
                                            <td className='col-md-2 text-center'>
                                                <Link href={route('users.edit', user.id)} className="btn">
                                                    <div className="over-icon">
                                                        <img src={`${BASE_URL}img/icons/edit.png`} alt="edit" width={40} className='original' />
                                                        <img src={`${BASE_URL}img/icons/edit-over.png`} alt="edit" width={40} className='overized' />
                                                    </div>
                                                </Link>
                                                <form onSubmit={handleSubmit} id={user.id} className='d-inline'>
                                                    <button className="btn">
                                                        <div className="over-icon">
                                                            <img src={`${BASE_URL}img/icons/delete.png`} alt="delete" width={40} className='original' />
                                                            <img src={`${BASE_URL}img/icons/delete-over.png`} alt="delete" width={40} className='overized' />
                                                        </div>
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination links={users.links} />
        </Layout>
    );
};

export default UsersContent;
