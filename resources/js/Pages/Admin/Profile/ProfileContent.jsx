import Layout from '@/Layouts/Admin/Layout';
import { STORAGE_URL } from '@/constants/constants';
import { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import InputErrors from '@/components/Admin/InputErrors';
import { toast } from 'react-toastify';

const ProfileContent = () => {
  const { flash, user_auth } = usePage().props;
  useEffect(() => {
    if (flash?.message) {
      if (flash.message.tipo === 'success') {
        toast.success(flash.message.testo);
      } else if (flash.message.tipo === 'danger') {
        toast.error(flash.message.testo);
      }
    }
  }, [flash]);

  const [editable, setEditable] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const { data, setData, errors, post, processing } = useForm({
    _method: 'PATCH',
    ...user_auth,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setData('profile_img', file);
    setSelectedFileName(file.name);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditable(true);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    post(route('admin.profile.update', user_auth.id), {
      onSuccess: () => {
        setEditable(false);
        setSelectedFileName('');
        toast.success('Profilo modificato con successo');
      },
      onError: () => {
        toast.error('Errore durante la modifica del profilo');
      },
    });
  };

  const avatarUrl = STORAGE_URL + user_auth.profile_img;
  const fullName = `${user_auth.name || ''} ${user_auth.lastname || ''}`.trim();

  const profileLinks = [
    { icon: 'fa-solid fa-globe', label: 'Website', value: 'https://quickcms.altervista.org/' },
    { icon: 'fa-brands fa-github', label: 'Github', value: 'quickcms' },
    { icon: 'fa-brands fa-x-twitter', label: 'X / Twitter', value: '@quickcms' },
    { icon: 'fa-brands fa-instagram', label: 'Instagram', value: 'quickcms' },
    { icon: 'fa-brands fa-facebook-f', label: 'Facebook', value: 'quickcms' },
  ];

  const handleCancelEdit = () => {
    setEditable(false);
    setSelectedFileName('');
    setData({
      _method: 'PATCH',
      ...user_auth,
    });
  };

  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-hero card mb-3">
          <div className="card-body">
            <div className="profile-hero-content">
              <div className="profile-hero-title">
                <h2 className="mb-1">Profilo account</h2>
                <p className="mb-0">Gestisci i dati personali e le impostazioni del tuo account admin.</p>
              </div>
              <div className="profile-hero-badge">
                <i className="fa-solid fa-shield-halved"></i>
                <span>{user_auth.role}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-xl-4 col-lg-5">
            <div className="card profile-summary-card">
              <div className="card-body">
                <div className="profile-avatar-wrap">
                  <img src={avatarUrl} alt={user_auth.name} title={user_auth.name} className="profile-avatar object-fit-cover" />
                  {editable && (
                    <div className="profile-image-uploader">
                      <input
                        type="file"
                        name="profile_img"
                        id="profile_img"
                        accept="image/*"
                        className="profile-image-input"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="profile_img" className="profile-image-trigger">
                        <i className="fa-solid fa-camera"></i>
                        <span>Cambia immagine</span>
                      </label>
                      <small className="profile-image-filename">
                        {selectedFileName ? selectedFileName : 'PNG, JPG, WEBP - max 5MB'}
                      </small>
                    </div>
                  )}
                </div>

                <div className="profile-summary-head">
                  <h4>{fullName || user_auth.name}</h4>
                  <p>{user_auth.email}</p>
                </div>

                <div className="profile-stat-grid">
                  <div className="profile-stat-card">
                    <small>ID</small>
                    <strong>#{user_auth.id}</strong>
                  </div>
                  <div className="profile-stat-card">
                    <small>Ruolo</small>
                    <strong className="text-capitalize">{user_auth.role}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="card profile-links-card mt-3">
              <div className="card-body">
                <h6 className="profile-card-title">Link progetto</h6>
                <div className="profile-link-list">
                  {profileLinks.map((item) => (
                    <div key={item.label} className="profile-link-item">
                      <div className="profile-link-label">
                        <i className={item.icon}></i>
                        <span>{item.label}</span>
                      </div>
                      <span className="profile-link-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-8 col-lg-7">
            <div className="card profile-form-card">
              <div className="card-body">
                <div className="profile-form-header">
                  <div>
                    <h5 className="mb-1">Informazioni account</h5>
                    <p className="mb-0">Aggiorna i dati del profilo senza modificare la logica dell’applicazione.</p>
                  </div>
                  <div className="profile-form-actions">
                    {editable ? (
                      <>
                        <button className="btn btn-success" onClick={handleSaveClick} disabled={processing}>
                          {processing ? 'In corso...' : 'Salva'}
                        </button>
                        <button className="btn btn-outline-secondary" onClick={handleCancelEdit}>
                          Annulla
                        </button>
                      </>
                    ) : (
                      <button className="btn cb-primary" onClick={handleEditClick}>
                        Modifica profilo
                      </button>
                    )}
                  </div>
                </div>

                <InputErrors errors={errors} />

                <div className="profile-form-grid">
                  <div className="profile-field-row">
                    <label>Id utente</label>
                    <div className="profile-field-static">#{user_auth.id}</div>
                  </div>

                  <div className="profile-field-row">
                    <label>Nome</label>
                    {editable ? (
                      <input type="text" name="name" value={data.name || ''} onChange={handleInputChange} className="form-control" />
                    ) : (
                      <div className="profile-field-static">{user_auth.name}</div>
                    )}
                  </div>

                  <div className="profile-field-row">
                    <label>Cognome</label>
                    {editable ? (
                      <input
                        type="text"
                        name="lastname"
                        value={data.lastname || ''}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      <div className="profile-field-static">{user_auth.lastname}</div>
                    )}
                  </div>

                  <div className="profile-field-row">
                    <label>Email</label>
                    {editable ? (
                      <input type="text" name="email" value={data.email || ''} onChange={handleInputChange} className="form-control" />
                    ) : (
                      <div className="profile-field-static">{user_auth.email}</div>
                    )}
                  </div>

                  <div className="profile-field-row">
                    <label>Ruolo</label>
                    {user_auth.role === 'admin' && editable ? (
                      <select name="role" value={data.role || 'admin'} onChange={handleInputChange} className="form-select">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    ) : (
                      <div className="profile-field-static text-capitalize">{user_auth.role}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card profile-security-card mt-3">
              <div className="card-body">
                <h6 className="profile-card-title mb-2">Sicurezza account</h6>
                <p className="mb-0">
                  Mantieni i dati aggiornati e verifica periodicamente email, ruolo e credenziali per lavorare in sicurezza.
                </p>
                <div className="profile-security-chips">
                  <span className="profile-security-chip">
                    <i className="fa-regular fa-envelope"></i>
                    Email verificata
                  </span>
                  <span className="profile-security-chip">
                    <i className="fa-solid fa-user-shield"></i>
                    Accesso admin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileContent;
