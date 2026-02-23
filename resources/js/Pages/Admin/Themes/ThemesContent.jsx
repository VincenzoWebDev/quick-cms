import Layout from '@/Layouts/Admin/Layout';
import { SectionHeader } from '@/components/Admin/Index';
import AdminDialog from '@/components/Admin/Modals/AdminDialog';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ThemesContent = ({ themes, flash }) => {
  const [modal, setModal] = useState({ type: null, payload: null });
  const [modalErrors, setModalErrors] = useState({});
  const [modalProcessing, setModalProcessing] = useState(false);
  const [createData, setCreateData] = useState({ name: '', path: '' });
  const [editData, setEditData] = useState({ name: '', path: '' });

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
        onError: () => {
          toast.error(`Errore durante l'aggiornamento dello stato del tema ${themeId}`);
        },
      }
    );
  };

  const closeModal = () => {
    setModal({ type: null, payload: null });
    setModalErrors({});
    setModalProcessing(false);
  };

  const openCreateModal = () => {
    setCreateData({ name: '', path: '' });
    setModalErrors({});
    setModal({ type: 'create', payload: null });
  };

  const openEditModal = (theme) => {
    setEditData({ name: theme.name || '', path: theme.path || '' });
    setModalErrors({});
    setModal({ type: 'edit', payload: theme });
  };

  const submitCreate = (e) => {
    e.preventDefault();
    setModalProcessing(true);
    setModalErrors({});

    router.post(route('themes.store'), createData, {
      preserveScroll: true,
      onError: (errors) => setModalErrors(errors || {}),
      onFinish: () => setModalProcessing(false),
      onSuccess: () => closeModal(),
    });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    if (!modal.payload) return;

    setModalProcessing(true);
    setModalErrors({});

    router.post(
      route('themes.update', modal.payload.id),
      {
        ...editData,
        _method: 'patch',
      },
      {
        preserveScroll: true,
        onError: (errors) => setModalErrors(errors || {}),
        onFinish: () => setModalProcessing(false),
        onSuccess: () => closeModal(),
      }
    );
  };

  return (
    <Layout>
      <SectionHeader
        title="Gestione temi"
        subtitle="Attiva, disattiva e organizza i temi disponibili nel sistema."
        primaryAction={
          <button type="button" className="btn cb-primary" onClick={openCreateModal}>
            Inserisci nuovo tema
          </button>
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
                  <th scope="col">Nome team</th>
                  <th scope="col">Percorso</th>
                  <th scope="col">Stato</th>
                  <th scope="col" className="text-center">
                    Operazioni
                  </th>
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
                      <td>{theme.path}</td>
                      <td scope="row" className="com-md-3">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`flexSwitchCheckDefault${theme.id}`}
                            data-theme-id={theme.id}
                            checked={theme.active}
                            onChange={handleSwitchChange}
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="action-buttons justify-content-center">
                          <button type="button" className="action-icon-btn action-edit" onClick={() => openEditModal(theme)}>
                            <i className="fa-solid fa-pen"></i>
                          </button>
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

      <AdminDialog
        isOpen={modal.type === 'create'}
        onClose={closeModal}
        title="Nuovo Tema"
        subtitle="Inserisci un tema disponibile nel sistema."
        icon="fa-palette"
        footer={
          <div className="variants-form-actions">
            <button type="submit" form="create-theme-form" className="btn cb-primary" disabled={modalProcessing}>
              {modalProcessing ? 'Salvataggio...' : 'Salva Tema'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Annulla
            </button>
          </div>
        }
      >
        <form id="create-theme-form" onSubmit={submitCreate} className="variants-form-grid">
          <div>
            <label htmlFor="create_theme_name" className="form-label">
              Nome tema
            </label>
            <input
              id="create_theme_name"
              type="text"
              className="form-control"
              placeholder="Nome tema"
              value={createData.name}
              onChange={(e) => setCreateData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
            {modalErrors.name && <small className="text-danger">{modalErrors.name}</small>}
          </div>

          <div>
            <label htmlFor="create_theme_path" className="form-label">
              Percorso
            </label>
            <textarea
              id="create_theme_path"
              className="form-control"
              rows="3"
              placeholder="resources/views/layouts/..."
              value={createData.path}
              onChange={(e) => setCreateData((prev) => ({ ...prev, path: e.target.value }))}
              required
            ></textarea>
            {modalErrors.path && <small className="text-danger">{modalErrors.path}</small>}
          </div>
        </form>
      </AdminDialog>

      <AdminDialog
        isOpen={modal.type === 'edit'}
        onClose={closeModal}
        title="Modifica Tema"
        subtitle={modal.payload ? `Stai modificando: ${modal.payload.name}` : 'Aggiorna i dati del tema'}
        icon="fa-pen-to-square"
        footer={
          <div className="variants-form-actions">
            <button type="submit" form="edit-theme-form" className="btn cb-primary" disabled={modalProcessing}>
              {modalProcessing ? 'Aggiornamento...' : 'Aggiorna Tema'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Annulla
            </button>
          </div>
        }
      >
        <form id="edit-theme-form" onSubmit={submitEdit} className="variants-form-grid">
          <div>
            <label htmlFor="edit_theme_name" className="form-label">
              Nome tema
            </label>
            <input
              id="edit_theme_name"
              type="text"
              className="form-control"
              value={editData.name}
              onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
            {modalErrors.name && <small className="text-danger">{modalErrors.name}</small>}
          </div>

          <div>
            <label htmlFor="edit_theme_path" className="form-label">
              Percorso
            </label>
            <textarea
              id="edit_theme_path"
              className="form-control"
              rows="3"
              value={editData.path}
              onChange={(e) => setEditData((prev) => ({ ...prev, path: e.target.value }))}
              required
            ></textarea>
            {modalErrors.path && <small className="text-danger">{modalErrors.path}</small>}
          </div>
        </form>
      </AdminDialog>
    </Layout>
  );
};

export default ThemesContent;
