import { useForm, Link } from '@inertiajs/react';
import InputErrors from '@/components/Admin/InputErrors';
import Layout from '@/Layouts/Admin/Layout';
import { STORAGE_URL } from '@/constants/constants';

const UserEdit = ({ user }) => {
    const { data, setData, post, errors, processing } = useForm({
        _method: 'PATCH',
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        profile_img: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('profile_img', file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.update', user.id));
    }

    return (
        <>
            <Layout>
                <h2>Modifica user</h2>
                <InputErrors errors={errors} />

                <div className='row'>
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="name">Nome</label>
                                <input type="text" name="name" id="name" className="form-control w-100" value={data.name}
                                    placeholder="Nome utente" onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="lastname">Cognome</label>
                                <input type="text" name="lastname" id="lastname" className="form-control w-100" value={data.lastname}
                                    placeholder="Cognome" onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" className="form-control w-100" value={data.email}
                                    placeholder="Email" onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="role">Ruolo</label>
                                <select className="form-select w-100" aria-label="Default select example" name="role" id="role"
                                    value={data.role} onChange={handleChange} >
                                    <option value="">Seleziona ruolo</option>
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="profile_img">Immagine di profilo</label>
                                <input type="file" name="profile_img" id="profile_img" className="form-control w-100" onChange={handleFileChange} />
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="btn cb-primary me-3" disabled={processing}>{processing ? 'In corso...' : 'Modifica'}</button>
                                <Link href={route('users.index')} className="btn btn-secondary">Torna indietro</Link>
                            </div>
                        </form >
                    </div>
                    <div className="col-md-4 text-center">
                        <p className="mb-3">Foto profilo</p>
                        <img src={STORAGE_URL + user.profile_img} title={user.name} alt={user.name}
                            width="300" className='img-fluid' />
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default UserEdit