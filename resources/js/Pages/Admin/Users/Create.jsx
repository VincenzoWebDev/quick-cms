import { Link, useForm } from '@inertiajs/react';
import InputErrors from '@/components/Admin/InputErrors';
import Layout from '@/Layouts/Admin/Layout';

const UserCreate = () => {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        lastname: '',
        password: '',
        email: '',
        role: '',
        profile_img: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('profile_img', file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };
    return (
        <Layout>
            <h2>Inserisci nuovo utente</h2>

            <InputErrors errors={errors} />


            <div className='row'>
                <div className='col-md-8'>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="name">Nome</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="Nome utente" value={data.name} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastname">Cognome</label>
                            <input type="text" name="lastname" id="lastname" className="form-control" placeholder="Cognome" value={data.lastname} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="Password" autoComplete="current-password" value={data.password} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" className="form-control" placeholder="Email" autoComplete="current-email" value={data.email} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="role">Ruolo</label>
                            <select className="form-select" aria-label="Seleziona ruolo" name="role" id="role" value={data.role} onChange={handleChange}>
                                <option value="">Seleziona ruolo</option>
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="profile_img">Immagine di profilo</label>
                            <input type="file" name="profile_img" id="profile_img" className="form-control" onChange={handleFileChange} />
                        </div>

                        <div className="mb-3">
                            <button className="btn cb-primary me-3" disabled={processing}>{processing ? 'In corso...' : 'Inserisci'}</button>
                            <Link href={route('users.index')} className="btn btn-secondary">Torna indietro</Link>
                        </div>
                    </form>
                </div>
                <div className='col-md-4'></div>
            </div>
        </Layout>
    )
}

export default UserCreate