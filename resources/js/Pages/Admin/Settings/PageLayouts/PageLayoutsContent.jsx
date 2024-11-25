import AlertErrors from "@/components/Admin/AlertErrors";
import { ButtonDelete, ButtonEdit } from "@/components/Admin/Index";
import { BASE_URL } from "@/constants/constants";
import Layout from "@/Layouts/Admin/Layout"
import { Link, router } from "@inertiajs/react"
import { useEffect, useState } from "react";

const PageLayoutsContent = ({ pageLayouts, flash }) => {
    const [message, setMessage] = useState(flash.message);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleDelete = (e) => {
        e.preventDefault();
        const layoutName = e.target.dataset.name;
        const layoutId = e.target.id;
        router.delete(route('settings.layouts.destroy', layoutId), {
            onSuccess: () => {
                setMessage({ tipo: 'success', testo: `Layout: ${layoutName} eliminato correttamente` });
            },
            onError: () => {
                setMessage({ tipo: 'danger', testo: `Errore durante l'eliminazione del layout: ${layoutName}` });
            }
        });
    }

    return (
        <Layout>
            <h2>Gestione layout pagine</h2>
            <AlertErrors message={message} />

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link href={route('settings.layouts.create')} className="btn cb-primary mb-3">Inserisci un nuovo layout</Link>
            </div>

            <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <div className="form-check d-flex justify-content-center align-items-center">
                                            <input className="form-check-input" type="checkbox" />
                                        </div>
                                    </th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nome layout</th>
                                    <th scope="col" className="text-center">Operazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pageLayouts.length > 0 ? (
                                        pageLayouts.map(layout => (
                                            <tr key={layout.id} className="align-middle">
                                                <th scope="row" className='col-auto'>
                                                    <div className="form-check d-flex justify-content-center align-items-center">
                                                        <input className="form-check-input" type="checkbox" />
                                                    </div>
                                                </th>
                                                <td scope="row" className="col-auto ">{layout.id}</td>
                                                <td scope="row" className="col-auto">{layout.name}</td>
                                                <td scope="row" className="col-auto text-center">
                                                    <Link href={route('settings.layouts.edit', layout.id)} className="btn px-2">
                                                        <ButtonEdit url={BASE_URL} />
                                                    </Link>
                                                    <form onSubmit={handleDelete} className="d-inline" id={layout.id} data-name={layout.name}>
                                                        <ButtonDelete url={BASE_URL} />
                                                    </form>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='7' className='text-center'>Non ci sono layout</td>
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

export default PageLayoutsContent