import AlertErrors from "@/components/Admin/AlertErrors";
import { ButtonDelete, ButtonEdit } from "@/components/Admin/Index";
import { BASE_URL } from "@/constants/constants";
import Layout from "@/Layouts/Admin/Layout"
import { Link, router } from "@inertiajs/react"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const ProductVariantsContent = ({ variants, variants_values, flash }) => {
    const MySwal = withReactContent(Swal);
    const [message, setMessage] = useState(flash.message);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleVariantDelete = (e, variant) => {
        e.preventDefault();
        const variantName = e.target.dataset.name;
        if (variantName) {
            MySwal.fire({
                title: "Sei sicuro di voler eliminare questa variante?",
                text: "Non sarà possibile annullare questa operazione!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--bs-cobalto)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, elimina!",
                cancelButtonText: "Annulla",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.delete(route('settings.variants.destroy', variant), {
                        onSuccess: () => {
                            setMessage({ tipo: 'success', testo: `Variante: ${variantName} eliminata correttamente` });
                        },
                        onError: () => {
                            setMessage({ tipo: 'danger', testo: `Errore durante l'eliminazione della variante: ${variantName}` });
                        }
                    });
                }
            });
        }
    }

    const handleValueDelete = (e, variant_value) => {
        e.preventDefault();
        const valueName = e.target.dataset.name;
        router.delete(route('settings.variant-values.destroy', variant_value), {
            onSuccess: () => {
                setMessage({ tipo: 'success', testo: `Variante: ${valueName} eliminata correttamente` });
            },
            onError: () => {
                setMessage({ tipo: 'danger', testo: `Errore durante l'eliminazione della variante: ${valueName}` });
            }
        });
    }

    return (
        <Layout>
            <h2>Gestione varianti prodotti</h2>
            <AlertErrors message={message} />

            <div className="row">
                <div className="col-md-6">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <Link href={route('settings.variants.create')} className="btn cb-primary mb-3">Inserisci una nuova variante</Link>
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
                                            <th scope="col">Nome variante</th>
                                            <th scope="col" className="text-center">Operazioni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            variants.length > 0 ? (
                                                variants.map(variant => (
                                                    <tr key={variant.id} className="align-middle">
                                                        <th scope="row" className='col-auto'>
                                                            <div className="form-check d-flex justify-content-center align-items-center">
                                                                <input className="form-check-input" type="checkbox" />
                                                            </div>
                                                        </th>
                                                        <td scope="row" className="col-auto ">{variant.id}</td>
                                                        <td scope="row" className="col-auto">{variant.name}</td>
                                                        <td scope="row" className="col-auto text-center">
                                                            <Link href={route('settings.variants.edit', variant.id)} className="btn px-2">
                                                                <ButtonEdit url={BASE_URL} />
                                                            </Link>
                                                            <form onSubmit={(e) => handleVariantDelete(e, variant)} className="d-inline" data-name={variant.name}>
                                                                <ButtonDelete url={BASE_URL} />
                                                            </form>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan='7' className='text-center'>Non ci sono varianti</td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <Link href={route('settings.variant-values.create')} className="btn cb-primary mb-3">Inserisci un nuovo valore</Link>
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
                                            <th scope="col">Valore</th>
                                            <th scope="col" className="text-center">Operazioni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            variants_values.length > 0 ? (
                                                variants_values.map(variant_value => (
                                                    <tr key={variant_value.id} className="align-middle">
                                                        <th scope="row" className='col-auto'>
                                                            <div className="form-check d-flex justify-content-center align-items-center">
                                                                <input className="form-check-input" type="checkbox" />
                                                            </div>
                                                        </th>
                                                        <td scope="row" className="col-auto ">{variant_value.id}</td>
                                                        <td scope="row" className="col-auto">{variant_value.value}</td>
                                                        <td scope="row" className="col-auto text-center">
                                                            {/* <Link href={route('settings.variant-values.edit', variant_value.id)} className="btn px-2">
                                                                <ButtonEdit url={BASE_URL} />
                                                            </Link> */}
                                                            <form onSubmit={(e) => handleValueDelete(e, variant_value)} className="d-inline" id={variant_value.id}>
                                                                <ButtonDelete url={BASE_URL} />
                                                            </form>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan='7' className='text-center'>Non ci sono varianti</td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default ProductVariantsContent