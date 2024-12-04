import FrontLayout from "@/Layouts/FrontLayout"
import { usePage } from "@inertiajs/react"

const Profile = ({ pages }) => {
    const { user_auth } = usePage().props

    return (
        <>
            <FrontLayout pages={pages}>
                <div className="container mb-5">
                    <div className="d-flex justify-content-center row">
                        <div className="col-md-10">
                            <div className="row p-2 card border rounded">
                                <div className="col-md-12 mt-1">
                                    <h4>Profile</h4>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <input type="text" className="form-control" value={user_auth.name} disabled />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Cognome</label>
                                                <input type="text" className="form-control" value={user_auth.lastname} disabled />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input type="text" className="form-control" value={user_auth.email} disabled />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Telefono</label>
                                                <input type="text" className="form-control" value={user_auth.phone || ''} disabled />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Indirizzo di spedizione</label>
                                                <input type="text" className="form-control" value={user_auth.shipping_address || ''} disabled />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Indirizzo di fatturazione</label>
                                                <input type="text" className="form-control" value={user_auth.billing_address || ''} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Ordini effettuati</label>
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Data</th>
                                                            <th>Totale</th>
                                                            <th>Stato</th>
                                                            <th>Dettagli</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>12/12/2023</td>
                                                            <td>100€</td>
                                                            <td>Pagato</td>
                                                            <td><a href="#" className="btn btn-primary">Dettagli</a></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FrontLayout>
        </>
    )
}

export default Profile