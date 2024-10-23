import Layout from "@/Layouts/Admin/Layout";
import { STORAGE_URL } from "@/constants/constants";
import { useState, useEffect } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import AlertErrors from "@/components/Admin/AlertErrors";
import InputErrors from "@/components/Admin/InputErrors";

const ProfileContent = () => {
    const { user_auth } = usePage().props;
    const [editable, setEditable] = useState(false);
    const { data, setData, errors, patch } = useForm({ ...user_auth });
    const [message, setMessage] = useState(null);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value || '' });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('profile_img', file);
    }

    const handleEditClick = (e) => {
        e.preventDefault();
        setEditable(true);
    }

    const handleSaveClick = (e) => {
        e.preventDefault();
        router.post(route('profile.update', user_auth.id), {
            ...data,
            _method: 'patch',
            forceFormData: true,
        }, {
            onSuccess: (res) => {
                setEditable(false);
                setMessage(res.props.flash.message);
            },
            onError: () => {
                setMessage({ tipo: 'danger', testo: 'Errore durante la modifica del profilo' });
            }
        });
    }

    return (
        <Layout>
            <AlertErrors message={message} />
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={STORAGE_URL + user_auth.profile_img} alt={user_auth.name} title={user_auth.name} className="border rounded-circle img-fluid object-fit-cover" style={{ height: '250px', width: '250px' }} />
                                    {editable && (
                                        <div className="outer">
                                            <div className="inner">
                                                <input type="file" name="profile_img" id="profile_img" accept="image/*" className="profile_img" onChange={handleFileChange} />
                                                <label htmlFor="profile_img"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg></label>
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-3">
                                        <h4>{user_auth.name}</h4>
                                        <p className="text-secondary mb-1">{user_auth.email}</p>
                                        {/* <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                        <button className="btn cb-primary">Follow</button>
                                        <button className="btn btn-outline-primary">Message</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                                    <span className="text-secondary">https://quickcms.altervista.org/</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                                    <span className="text-secondary">quickcms</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                                    <span className="text-secondary">@quickcms</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                                    <span className="text-secondary">quickcms</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                    <span className="text-secondary">quickcms</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">
                                <InputErrors errors={errors} />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Id utente</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {user_auth.id}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Nome</h6>
                                    </div>
                                    {editable ? (
                                        <input type="text" name="name" value={data.name} onChange={handleInputChange} className="form-control w-50" />
                                    ) : (
                                        <div className="col-sm-9 text-secondary">
                                            {user_auth.name}
                                        </div>
                                    )}
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Cognome</h6>
                                    </div>
                                    {editable ? (
                                        <input type="text" name="lastname" value={data.lastname} onChange={handleInputChange} className="form-control w-50" />
                                    ) : (
                                        <div className="col-sm-9 text-secondary">
                                            {user_auth.lastname}
                                        </div>
                                    )}
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    {editable ? (
                                        <input type="text" name="email" value={data.email} onChange={handleInputChange} className="form-control w-50" />
                                    ) : (
                                        <div className="col-sm-9 text-secondary">
                                            {user_auth.email}
                                        </div>
                                    )}
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Ruolo</h6>
                                    </div>
                                    {user_auth.role === 'admin' &&
                                        editable ? (
                                        <input type="text" name="role" value={data.role} onChange={handleInputChange} className="form-control w-50" />
                                    ) : (
                                        <div className="col-sm-9 text-secondary">
                                            {user_auth.role
                                            }
                                        </div>
                                    )}

                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12">
                                        {/* <a className="btn cb-primary" href="">Edit</a> */}
                                        {editable ? (
                                            <>
                                                <button className="btn btn-success me-2" onClick={handleSaveClick}>Salva</button>
                                                <button className="btn btn-danger" onClick={(e) => setEditable(false)}>Annulla</button>
                                            </>
                                        ) : (
                                            <button className="btn cb-primary" onClick={handleEditClick}>Modifica</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row gutters-sm">
                            <div className="col-sm-6 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                                        <small>Web Design</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%', ariaValuenow: '80', ariaValuemin: '0', ariaValuemax: '100' }}></div>
                                        </div>
                                        <small>Website Markup</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '72%', ariaValuenow: '72', ariaValuemin: '0', ariaValuemax: '100' }}></div>
                                        </div>
                                        <small>One Page</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '89%', ariaValuenow: '89', ariaValuemin: '0', ariaValuemax: '100' }}></div>
                                        </div>
                                        <small>Mobile Template</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '55%', ariaValuenow: '55', ariaValuemin: '0', ariaValuemax: '100' }}></div>
                                        </div>
                                        <small>Backend API</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '66%', ariaValuenow: '66', ariaValuemin: '0', ariaValuemax: '100' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                                        <small>Web Design</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%', ariaValuenow: '80', ariaValuemin: '0', ariaValuemax: '100' }}></div>
                                        </div>
                                        <small>Website Markup</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '72%', ariaValuenow: '72', ariaValuemin: '0', ariaValuemax: '100' }}></div>
                                        </div>
                                        <small>One Page</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '89%', ariaValuenow: '89', ariaValuemin: '0', ariaValuemax: '100' }}></div>
                                        </div>
                                        <small>Mobile Template</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '55%', ariaValuenow: '55', ariaValuemin: '0', ariaValuemax: '100' }}></div>
                                        </div>
                                        <small>Backend API</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '66%', ariaValuenow: '66', ariaValuemin: '0', ariaValuemax: '100' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default ProfileContent;