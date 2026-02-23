import Layout from '@/Layouts/Admin/Layout';
import { ButtonDelete, ButtonEdit, SectionHeader } from '@/components/Admin/Index';
import { useEffect } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SettingsContent = ({ settings, flash }) => {
  useEffect(() => {
    if (flash?.message) {
      if (flash.message.tipo === 'success') {
        toast.success(flash.message.testo);
      } else if (flash.message.tipo === 'danger') {
        toast.error(flash.message.testo);
      }
    }
  }, [flash]);

  const MySwal = withReactContent(Swal);
  const { delete: destroy } = useForm();

  const handleSwitchChange = (e) => {
    e.preventDefault();
    const settingId = e.target.dataset.settingId;
    const value = e.target.checked ? '1' : '0';
    router.post(
      route('settings.switch', { settingId }),
      { value },
      {
        onSuccess: () => {
          toast.success(`Impostazione ${value === '0' ? 'disattivata' : 'attivata'} correttamente`);
        },
        onError: () => {
          toast.error(`Errore durante l'attivazione/disattivazione dell'impostazione`);
        },
      }
    );
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const settingId = e.target.id;
    if (settingId) {
      MySwal.fire({
        title: 'Sei sicuro di voler eliminare questa impostazione?',
        text: 'Non sarà possibile annullare questa operazione!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--bs-cobalto)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, elimina!',
        cancelButtonText: 'Annulla',
      }).then((result) => {
        if (result.isConfirmed) {
          destroy(route('settings.destroy', settingId), {
            onError: () => {
              toast.error("Errore durante l'eliminazione dell'impostazione");
            },
          });
        }
      });
    }
  };

  return (
    <Layout>
      <SectionHeader
        title="Gestione impostazioni"
        subtitle="Controlla opzioni globali e flag di configurazione del pannello."
        primaryAction={
          <Link href={route('settings.create')} className="btn cb-primary">
            Inserisci nuova impostazione
          </Link>
        }
      />

      <div className="card shadow-2-strong">
        <div className="card-body">
          <div className="table-responsive admin-table-shell">
            <table className="table table-hover mb-0 admin-table">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Id
                  </th>
                  <th scope="col">Chiave</th>
                  <th scope="col">Valore</th>
                  <th scope="col" className="text-center">
                    Operazioni
                  </th>
                </tr>
              </thead>
              <tbody>
                {settings.length > 0 ? (
                  settings.map((setting) => (
                    <tr key={setting.id} className="align-middle">
                      <th scope="row" className="col-md-2 text-center">
                        {setting.id}
                      </th>
                      <td scope="row" className="col-md-4">
                        {setting.key}
                      </td>
                      {setting.value === '0' || setting.value === '1' ? (
                        <td scope="row" className="col-md-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input setting-switch"
                              type="checkbox"
                              role="switch"
                              id={`flexSwitchCheckDefault${setting.id}`}
                              data-setting-id={setting.id}
                              checked={setting.value === '0' ? false : true}
                              onChange={handleSwitchChange}
                            />
                          </div>
                        </td>
                      ) : (
                        <td scope="row" className="col-md-3">
                          {setting.value}
                        </td>
                      )}
                      <td scope="row" className="text-center col-md-3">
                        <div className="action-buttons justify-content-center">
                          <Link href={route('settings.edit', setting.id)} className="action-icon-link">
                            <ButtonEdit />
                          </Link>
                          <form onSubmit={handleDelete} className="d-inline" id={setting.id}>
                            <ButtonDelete />
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Non ci sono impostazioni
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsContent;
