import { ButtonDelete, SectionHeader } from '@/components/Admin/Index';
import AdminDialog from '@/components/Admin/Modals/AdminDialog';
import Layout from '@/Layouts/Admin/Layout';
import { router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const PageLayoutsContent = ({ pageLayouts, flash }) => {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState({ type: null, payload: null });
  const [modalErrors, setModalErrors] = useState({});
  const [modalProcessing, setModalProcessing] = useState(false);
  const [createData, setCreateData] = useState({ name: '' });
  const [editData, setEditData] = useState({ name: '' });

  useEffect(() => {
    if (flash?.message) {
      if (flash.message.tipo === 'success') {
        toast.success(flash.message.testo);
      } else if (flash.message.tipo === 'danger') {
        toast.error(flash.message.testo);
      }
    }
  }, [flash]);

  const filteredLayouts = useMemo(() => {
    return pageLayouts.filter((layout) => layout.name.toLowerCase().includes(search.toLowerCase()));
  }, [pageLayouts, search]);
  const totalLayouts = pageLayouts.length;

  const openModal = (type, payload = null) => {
    setModalErrors({});
    setModalProcessing(false);
    setModal({ type, payload });
  };

  const closeModal = () => {
    setModal({ type: null, payload: null });
    setModalErrors({});
    setModalProcessing(false);
  };

  const openCreateModal = () => {
    setCreateData({ name: '' });
    openModal('create');
  };

  const openEditModal = (layout) => {
    setEditData({ name: layout.name || '' });
    openModal('edit', layout);
  };

  const openDeleteModal = (layout) => {
    openModal('delete', layout);
  };

  const submitCreate = (e) => {
    e.preventDefault();
    setModalProcessing(true);
    setModalErrors({});

    router.post(route('settings.layouts.store'), createData, {
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
      route('settings.layouts.update', modal.payload.id),
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
    router.delete(route('settings.layouts.destroy', modal.payload.id), {
      preserveScroll: true,
      onFinish: () => setModalProcessing(false),
      onSuccess: () => closeModal(),
      onError: () => toast.error(`Errore durante l'eliminazione del layout: ${modal.payload?.name}`),
    });
  };

  return (
    <Layout>
      <SectionHeader
        title="Gestione layout pagine"
        subtitle="Definisci template e strutture disponibili per le pagine."
        primaryAction={
          <button type="button" className="btn cb-primary" onClick={openCreateModal}>
            Inserisci un nuovo layout
          </button>
        }
      />

      <div className="card shadow-2-strong">
        <div className="card-body">
          <div className="admin-overview-strip">
            <div className="admin-overview-item">
              <small>Totale layout</small>
              <strong>{totalLayouts}</strong>
            </div>
            <div className="admin-overview-item">
              <small>Visualizzati</small>
              <strong>{filteredLayouts.length}</strong>
            </div>
            <div className="admin-overview-item">
              <small>Ricerca attiva</small>
              <strong>{search ? 'Si' : 'No'}</strong>
            </div>
          </div>

          <div className="variants-search mb-3">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Cerca layout..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="admin-list-toolbar">
            <p className="mb-0">I layout definiscono la struttura base delle pagine disponibili nel CMS.</p>
          </div>

          <div className="table-responsive admin-table-shell">
            <table className="table table-hover mb-0 admin-table page-layouts-table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nome layout</th>
                  <th scope="col" className="text-center">
                    Operazioni
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLayouts.length > 0 ? (
                  filteredLayouts.map((layout) => (
                    <tr key={layout.id} className="align-middle">
                      <td>#{layout.id}</td>
                      <td>
                        <span className="page-layout-name-pill">{layout.name}</span>
                      </td>
                      <td className="text-center">
                        <div className="action-buttons justify-content-center">
                          <button type="button" className="action-icon-btn action-edit" onClick={() => openEditModal(layout)}>
                            <i className="fa-solid fa-pen"></i>
                          </button>
                          <ButtonDelete type="button" onClick={() => openDeleteModal(layout)} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      Non ci sono layout
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
        title="Nuovo Layout"
        subtitle="Crea un nuovo layout pagina."
        icon="fa-layer-group"
        footer={
          <div className="variants-form-actions">
            <button type="submit" form="create-layout-form" className="btn cb-primary" disabled={modalProcessing}>
              {modalProcessing ? 'Salvataggio...' : 'Salva Layout'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Annulla
            </button>
          </div>
        }
      >
        <form id="create-layout-form" onSubmit={submitCreate} className="variants-form-grid">
          <div>
            <label htmlFor="layout_create_name" className="form-label">
              Nome layout
            </label>
            <input
              id="layout_create_name"
              type="text"
              className="form-control"
              placeholder="Es. Landing, Full width, Sidebar"
              value={createData.name}
              onChange={(e) => setCreateData({ name: e.target.value })}
              required
            />
            {modalErrors.name && <small className="text-danger">{modalErrors.name}</small>}
          </div>
        </form>
      </AdminDialog>

      <AdminDialog
        isOpen={modal.type === 'edit'}
        onClose={closeModal}
        title="Modifica Layout"
        subtitle={modal.payload ? `Stai modificando: ${modal.payload.name}` : 'Aggiorna nome layout'}
        icon="fa-pen-to-square"
        footer={
          <div className="variants-form-actions">
            <button type="submit" form="edit-layout-form" className="btn cb-primary" disabled={modalProcessing}>
              {modalProcessing ? 'Aggiornamento...' : 'Aggiorna Layout'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Annulla
            </button>
          </div>
        }
      >
        <form id="edit-layout-form" onSubmit={submitEdit} className="variants-form-grid">
          <div>
            <label htmlFor="layout_edit_name" className="form-label">
              Nome layout
            </label>
            <input
              id="layout_edit_name"
              type="text"
              className="form-control"
              value={editData.name}
              onChange={(e) => setEditData({ name: e.target.value })}
              required
            />
            {modalErrors.name && <small className="text-danger">{modalErrors.name}</small>}
          </div>
        </form>
      </AdminDialog>

      <AdminDialog
        isOpen={modal.type === 'delete'}
        onClose={closeModal}
        title="Elimina Layout"
        subtitle="Questa azione non può essere annullata."
        icon="fa-triangle-exclamation"
        width={520}
        footer={
          <div className="variants-form-actions">
            <button type="button" className="btn btn-danger" onClick={submitDelete} disabled={modalProcessing}>
              {modalProcessing ? 'Eliminazione...' : 'Conferma Eliminazione'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Annulla
            </button>
          </div>
        }
      >
        <div className="admin-dialog-confirm-text">
          Stai per eliminare il layout <strong>{modal.payload?.name}</strong>.
        </div>
      </AdminDialog>
    </Layout>
  );
};

export default PageLayoutsContent;
