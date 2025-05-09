import Layout from '@/Layouts/Admin/Layout';
import { Link, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ThemesContent = ({ themes, flash }) => {
  useEffect(() => {
    if (flash?.message) {
      if (flash.message.tipo === 'success') {
        toast.success(flash.message.testo);
      } else if (flash.message.tipo === 'danger') {
        toast.error(flash.message.testo);
      }
    }
  }, [flash]);

  const handleSwitchChange = (e) => {
    e.preventDefault();
    const themeId = e.target.dataset.themeId;
    const active = e.target.checked ? 1 : 0;
    // Invia una richiesta al server per aggiornare lo stato del tema
    router.post(
      route('themes.switch', themeId),
      { active },
      {
        onSuccess: () => {
          if (active) {
            toast.success(`Tema ${themeId} attivato correttamente`);
          } else {
            toast.success(`Tema ${themeId} disattivato correttamente`);
          }
        },
        onError: (error) => {
          setMessage({ tipo: 'danger', testo: error.message });
        },
      }
    );
  };

  return (
    <Layout>
      <h2>Gestione temi</h2>

      <div className="d-grid gap-2 d-md-flex justify-content-md-start">
        <Link href={route('themes.create')} className="btn cb-primary mb-3">
          Inserisci nuovo tema
        </Link>
      </div>

      <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Id
                  </th>
                  <th scope="col">Nome team</th>
                  <th scope="col">Stato</th>
                </tr>
              </thead>
              <tbody>
                {themes.map((theme) => {
                  return (
                    <tr key={theme.id} className="align-middle">
                      <th scope="row" className="col-md-2 text-center">
                        {theme.id}
                      </th>
                      <td className="col-md-5">{theme.name}</td>
                      <td scope="row" className="com-md-5">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`flexSwitchCheckDefault${theme.id}`}
                            style={{ width: '40px', height: '20px' }}
                            data-theme-id={theme.id}
                            checked={theme.active}
                            onChange={handleSwitchChange}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThemesContent;
