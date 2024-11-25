import UserProfileContent from "./UserProfileContent";
import { usePage } from "@inertiajs/react";

const Profile = () => {
    const { user_auth } = usePage().props;

    return (
        <UserProfileContent>
            <div className="row p-2 card border rounded">
                <h4>Profile</h4>
                <hr />
                <div className="row">
                    <div className="col-md-12">
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
                </div>
            </div>
        </UserProfileContent>
    )
}

export default Profile