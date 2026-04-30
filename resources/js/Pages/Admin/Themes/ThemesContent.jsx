import Layout from '@/Layouts/Admin/Layout';
import { ButtonDelete, SectionHeader } from '@/components/Admin/Index';
import AdminDialog from '@/components/Admin/Modals/AdminDialog';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const initialCreateData = {
  name: '',
  type: 'content',
  parent_theme_id: '',
  description: '',
  activate_after_create: false,
};

const initialEditData = {
  name: '',
  type: 'content',
  parent_theme_id: '',
  description: '',
};

const ThemesContent = ({ themes, flash }) => {
  const [modal, setModal] = useState({ type: null, payload: null });
  const [modalErrors, setModalErrors] = useState({});
  const [modalProcessing, setModalProcessing] = useState(false);
  const [createData, setCreateData] = useState(initialCreateData);
  const [editData, setEditData] = useState(initialEditData);

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

    router.post(
      route('themes.switch', themeId),
      { active },
      {
        onSuccess: () => {
          toast.success(active ? `Tema ${themeId} attivato correttamente` : `Tema ${themeId} disattivato correttamente`);
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
    setCreateData(initialCreateData);
    setModalErrors({});
    setModal({ type: 'create', payload: null });
  };

  const openEditModal = (theme) => {
    setEditData({
      name: theme.name || '',
      type: theme.type || 'content',
      parent_theme_id: theme.parent_theme_id || '',
      description: theme.description || '',
    });
    setModalErrors({});
    setModal({ type: 'edit', payload: theme });
  };

  const openDeleteModal = (theme) => {
    setModalErrors({});
    setModalProcessing(false);
    setModal({ type: 'delete', payload: theme });
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

  const submitDelete = () => {
    if (!modal.payload) return;

    setModalProcessing(true);
    router.delete(route('themes.destroy', modal.payload.id), {
      preserveScroll: true,
      onFinish: () => setModalProcessing(false),
      onSuccess: () => closeModal(),
      onError: () => toast.error(`Errore durante l'eliminazione del tema: ${modal.payload?.name}`),
    });
  };

  const totalThemes = themes.length;
  const activeThemes = themes.filter((theme) => Boolean(theme.active)).length;
  const inactiveThemes = totalThemes - activeThemes;
  const deleteBlocked = Boolean(modal.payload?.active || modal.payload?.child_themes_count > 0);

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
          <div className="admin-overview-strip">
            <div className="admin-overview-item">
              <small>Totale temi</small>
              <strong>{totalThemes}</strong>
            </div>
            <div className="admin-overview-item">
              <small>Temi attivi</small>
              <strong>{activeThemes}</strong>
            </div>
            <div className="admin-overview-item">
              <small>Temi inattivi</small>
              <strong>{inactiveThemes}</strong>
            </div>
          </div>

          <div className="admin-list-toolbar">
            <p className="mb-0">Gestisci attivazione, tema base e scaffold senza inserire path manuali.</p>
          </div>

          <div className="table-responsive admin-table-shell">
            <table className="table table-hover mb-0 admin-table themes-table">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Id
                  </th>
                  <th scope="col">Tema</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Base</th>
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
                      <th scope="row" className="col-md-1 text-center">
                        #{theme.id}
                      </th>
                      <td className="col-md-3">
                        <div>{theme.name}</div>
                        <small className="text-muted">{theme.type === 'ecommerce' ? 'Ecommerce' : 'Content'}</small>
                      </td>
                      <td className="themes-path-cell">{theme.slug || theme.name}</td>
                      <td>{theme.parent_theme?.name || 'Nessuno'}</td>
                      <td className="col-md-3">
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <span className={`themes-status-badge ${theme.active ? 'is-active' : 'is-inactive'}`}>
                            {theme.active ? 'Attivo' : 'Inattivo'}
                          </span>
                          <span className={`themes-status-badge ${theme.has_scaffold ? 'is-active' : 'is-inactive'}`}>
                            {theme.has_scaffold ? 'Scaffold' : 'Parziale'}
                          </span>
                          {theme.child_themes_count > 0 && <span className="themes-status-badge is-inactive">Base in uso</span>}
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
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="action-buttons justify-content-center">
                          <button type="button" className="action-icon-btn action-edit" onClick={() => openEditModal(theme)}>
                            <i className="fa-solid fa-pen"></i>
                          </button>
                          <ButtonDelete type="button" onClick={() => openDeleteModal(theme)} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {themes.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Nessun tema disponibile
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AdminDialog
        isOpen={modal.type === 'create'}
        onClose={closeModal}
        title="Nuovo Tema"
        subtitle="Crea il tema e genera automaticamente la struttura iniziale."
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
            <label htmlFor="create_theme_type" className="form-label">
              Tipo
            </label>
            <select
              id="create_theme_type"
              className="form-select"
              value={createData.type}
              onChange={(e) => setCreateData((prev) => ({ ...prev, type: e.target.value }))}
            >
              <option value="content">Content</option>
              <option value="ecommerce">Ecommerce</option>
            </select>
            {modalErrors.type && <small className="text-danger">{modalErrors.type}</small>}
          </div>

          <div>
            <label htmlFor="create_theme_parent" className="form-label">
              Tema base
            </label>
            <select
              id="create_theme_parent"
              className="form-select"
              value={createData.parent_theme_id}
              onChange={(e) => setCreateData((prev) => ({ ...prev, parent_theme_id: e.target.value }))}
            >
              <option value="">Nessuno</option>
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
            {modalErrors.parent_theme_id && <small className="text-danger">{modalErrors.parent_theme_id}</small>}
          </div>

          <div>
            <label htmlFor="create_theme_description" className="form-label">
              Descrizione
            </label>
            <textarea
              id="create_theme_description"
              className="form-control"
              rows="3"
              value={createData.description}
              onChange={(e) => setCreateData((prev) => ({ ...prev, description: e.target.value }))}
            ></textarea>
          </div>

          <div className="form-check">
            <input
              id="create_theme_activate"
              className="form-check-input"
              type="checkbox"
              checked={createData.activate_after_create}
              onChange={(e) => setCreateData((prev) => ({ ...prev, activate_after_create: e.target.checked }))}
            />
            <label htmlFor="create_theme_activate" className="form-check-label">
              Attiva subito il tema dopo la creazione
            </label>
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
            <label htmlFor="edit_theme_type" className="form-label">
              Tipo
            </label>
            <select
              id="edit_theme_type"
              className="form-select"
              value={editData.type}
              onChange={(e) => setEditData((prev) => ({ ...prev, type: e.target.value }))}
            >
              <option value="content">Content</option>
              <option value="ecommerce">Ecommerce</option>
            </select>
          </div>

          <div>
            <label htmlFor="edit_theme_parent" className="form-label">
              Tema base
            </label>
            <select
              id="edit_theme_parent"
              className="form-select"
              value={editData.parent_theme_id}
              onChange={(e) => setEditData((prev) => ({ ...prev, parent_theme_id: e.target.value }))}
            >
              <option value="">Nessuno</option>
              {themes
                .filter((theme) => theme.id !== modal.payload?.id)
                .map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="edit_theme_description" className="form-label">
              Descrizione
            </label>
            <textarea
              id="edit_theme_description"
              className="form-control"
              rows="3"
              value={editData.description}
              onChange={(e) => setEditData((prev) => ({ ...prev, description: e.target.value }))}
            ></textarea>
          </div>
        </form>
      </AdminDialog>

      <AdminDialog
        isOpen={modal.type === 'delete'}
        onClose={closeModal}
        title="Elimina Tema"
        subtitle="Questa azione rimuove anche file, cartelle e manifest del tema."
        icon="fa-triangle-exclamation"
        width={560}
        footer={
          <div className="variants-form-actions">
            <button type="button" className="btn btn-danger" onClick={submitDelete} disabled={modalProcessing || deleteBlocked}>
              {modalProcessing ? 'Eliminazione...' : 'Conferma Eliminazione'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Annulla
            </button>
          </div>
        }
      >
        <div className="admin-dialog-confirm-text">
          Stai per eliminare il tema <strong>{modal.payload?.name}</strong>.
        </div>
        <div className="admin-dialog-confirm-text mt-2">
          Verranno rimossi:
          <br />
          <code>resources/js/Pages/Front/Themes/{modal.payload?.slug || modal.payload?.name}</code>
          <br />
          <code>resources/views/layouts/{modal.payload?.slug || modal.payload?.name}</code>
          <br />
          <code>resources/css/themes/{modal.payload?.slug || modal.payload?.name}</code>
          <br />
          <code>resources/themes/{modal.payload?.slug || modal.payload?.name}</code>
          <br />
          <code>public/themes/{modal.payload?.slug || modal.payload?.name}</code>
        </div>
        {modal.payload?.active ? <div className="text-danger mt-2">Il tema attivo non può essere eliminato.</div> : null}
        {modal.payload?.child_themes_count > 0 ? <div className="text-danger mt-2">Questo tema è usato come base da altri temi e non può essere eliminato.</div> : null}
      </AdminDialog>
    </Layout>
  );
};

export default ThemesContent;
