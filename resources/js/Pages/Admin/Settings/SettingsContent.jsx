import Layout from "@/Layouts/Admin/Layout";
import { AlertErrors, ButtonDelete, ButtonEdit } from "@/components/Admin/Index";
import { useEffect, useState } from 'react';
import { Link, useForm, router } from "@inertiajs/react";
import { BASE_URL } from '@/constants/constants';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SettingsContent = ({ settings, flash }) => {
    const MySwal = withReactContent(Swal);
    const [message, setMessage] = useState(flash.message);
    const { delete: destroy } = useForm();

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleSwitchChange = (e) => {
        e.preventDefault();
        const settingId = e.target.dataset.settingId;
        const value = e.target.checked ? '1' : '0';
        router.post(route('settings.switch', { settingId }), { value }, {
            onSuccess: () => {
                setMessage({ tipo: 'success', testo: `Impostazione ${value === 0 ? 'disattivata' : 'attivata'} correttamente` });
            },
            onError: () => {
                setMessage({ tipo: 'danger', testo: `Errore durante l'attivazione/disattivazione dell'impostazione` });
            }
        });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        const settingId = e.target.id;
        if (settingId) {
            MySwal.fire({
                title: "Sei sicuro di voler eliminare questa impostazione?",
                text: "Non sarà possibile annullare questa operazione!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--bs-cobalto)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, elimina!",
                cancelButtonText: "Annulla",
            }).then((result) => {
                if (result.isConfirmed) {
                    destroy(route('settings.destroy', settingId), {
                        onSuccess: (res) => {
                            setMessage(res.props.flash.message);
                        },
                        onError: () => {
                            setMessage({ tipo: 'danger', testo: 'Errore durante l\'eliminazione dell\'impostazione' });
                        }
                    });
                }
            });
        };
    }

    return (
        <Layout>
            <h2>Gestione Impostazioni</h2>
            <AlertErrors message={message} />

            <div className="d-grid gap-2 d-md-flex">
                <Link href={route('settings.create')} className="btn cb-primary mb-3">Inserisci nuova impostazione</Link>
            </div>

            <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-center">Id</th>
                                    <th scope="col">Chiave</th>
                                    <th scope="col">Valore</th>
                                    <th scope="col" className="text-center">Operazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {settings.length > 0 ? (
                                    settings.map(setting => (
                                        <tr key={setting.id} className="align-middle">
                                            <th scope="row" className='col-md-2 text-center'>{setting.id}</th>
                                            <td scope="row" className="col-md-4">{setting.key}</td>
                                            {setting.value === '0' || setting.value === '1' ?
                                                <td scope="row" className="col-md-3">
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input setting-switch" type="checkbox" role="switch"
                                                            id={`flexSwitchCheckDefault${setting.id}`} style={{ width: '40px', height: '20px' }}
                                                            data-setting-id={setting.id} checked={setting.value === '0' ? false : true} onChange={handleSwitchChange} />
                                                    </div>
                                                </td>
                                                :
                                                <td scope="row" className="col-md-3">{setting.value}</td>
                                            }
                                            <td scope="row" className="text-center col-md-3">
                                                <Link href={route('settings.edit', setting.id)} className="btn px-2">
                                                    <ButtonEdit url={BASE_URL} />
                                                </Link>
                                                <form onSubmit={handleDelete} className="d-inline" id={setting.id}>
                                                    <ButtonDelete url={BASE_URL} />
                                                </form>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan='4' className="text-center">Non ci sono impostazioni</td>
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

export default SettingsContent