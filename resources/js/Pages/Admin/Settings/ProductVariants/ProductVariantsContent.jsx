import { ButtonDelete, SectionHeader } from '@/components/Admin/Index';
import AdminDialog from '@/components/Admin/Modals/AdminDialog';
import Layout from '@/Layouts/Admin/Layout';
import { router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const ProductVariantsContent = ({ variants, variants_values, flash }) => {
  const [variantSearch, setVariantSearch] = useState('');
  const [valueSearch, setValueSearch] = useState('');
  const [activeVariantId, setActiveVariantId] = useState(variants[0]?.id || null);

  const [modal, setModal] = useState({ type: null, payload: null });
  const [modalErrors, setModalErrors] = useState({});
  const [modalProcessing, setModalProcessing] = useState(false);

  const [createVariantData, setCreateVariantData] = useState({ name: '' });
  const [editVariantData, setEditVariantData] = useState({ name: '' });
  const [createValueData, setCreateValueData] = useState({ name: '', product_variant_id: '' });

  useEffect(() => {
    if (flash?.message) {
      if (flash.message.tipo === 'success') {
        toast.success(flash.message.testo);
      } else if (flash.message.tipo === 'danger') {
        toast.error(flash.message.testo);
      }
    }
  }, [flash]);

  useEffect(() => {
    if (!activeVariantId && variants.length > 0) {
      setActiveVariantId(variants[0].id);
    }
  }, [variants, activeVariantId]);

  const valuesByVariantId = useMemo(() => {
    return variants_values.reduce((acc, valueItem) => {
      const variantId = valueItem.product_variant_id;
      if (!acc[variantId]) acc[variantId] = [];
      acc[variantId].push(valueItem);
      return acc;
    }, {});
  }, [variants_values]);
  const variantNameById = useMemo(
    () =>
      variants.reduce((acc, variant) => {
        acc[variant.id] = variant.name;
        return acc;
      }, {}),
    [variants]
  );

  const filteredVariants = useMemo(() => {
    return variants.filter((variant) => variant.name.toLowerCase().includes(variantSearch.toLowerCase()));
  }, [variants, variantSearch]);

  const displayedValues = useMemo(() => {
    const source = activeVariantId ? valuesByVariantId[activeVariantId] || [] : variants_values;
    return source.filter((item) => item.value.toLowerCase().includes(valueSearch.toLowerCase()));
  }, [activeVariantId, valueSearch, valuesByVariantId, variants_values]);

  const activeVariant = variants.find((variant) => variant.id === activeVariantId);
  const editingVariant = modal.type === 'editVariant' ? modal.payload : null;

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

  const openCreateVariantModal = () => {
    setCreateVariantData({ name: '' });
    openModal('createVariant');
  };

  const openEditVariantModal = (variant) => {
    setEditVariantData({ name: variant.name || '' });
    openModal('editVariant', variant);
  };

  const openCreateValueModal = () => {
    setCreateValueData({
      name: '',
      product_variant_id: activeVariantId ? String(activeVariantId) : '',
    });
    openModal('createValue');
  };

  const openDeleteVariantModal = (variant) => {
    openModal('deleteVariant', variant);
  };

  const openDeleteValueModal = (variantValue) => {
    openModal('deleteValue', variantValue);
  };

  const submitCreateVariant = (e) => {
    e.preventDefault();
    setModalProcessing(true);
    setModalErrors({});

    router.post(route('settings.variants.store'), createVariantData, {
      preserveScroll: true,
      onError: (errors) => setModalErrors(errors || {}),
      onFinish: () => setModalProcessing(false),
      onSuccess: () => closeModal(),
    });
  };

  const submitEditVariant = (e) => {
    e.preventDefault();
    if (!editingVariant) return;

    setModalProcessing(true);
    setModalErrors({});

    router.post(
      route('settings.variants.update', editingVariant.id),
      {
        ...editVariantData,
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

  const submitCreateValue = (e) => {
    e.preventDefault();
    setModalProcessing(true);
    setModalErrors({});

    router.post(route('settings.variant-values.store'), createValueData, {
      preserveScroll: true,
      onError: (errors) => setModalErrors(errors || {}),
      onFinish: () => setModalProcessing(false),
      onSuccess: () => closeModal(),
    });
  };

  const submitDelete = () => {
    if (!modal.payload) return;

    const isVariant = modal.type === 'deleteVariant';
    const deleteRoute = isVariant
      ? route('settings.variants.destroy', modal.payload)
      : route('settings.variant-values.destroy', modal.payload);

    setModalProcessing(true);
    router.delete(deleteRoute, {
      preserveScroll: true,
      onFinish: () => setModalProcessing(false),
      onSuccess: () => closeModal(),
      onError: () => {
        toast.error(
          isVariant ? "Errore durante l'eliminazione della variante" : "Errore durante l'eliminazione del valore"
        );
      },
    });
  };

  return (
    <Layout>
      <SectionHeader
        title="Gestione varianti prodotti"
        subtitle="Gestisci varianti e relativi valori per configurazioni prodotto flessibili."
        primaryAction={
          <div className="d-flex gap-2 flex-wrap">
            <button type="button" className="btn cb-primary" onClick={openCreateVariantModal}>
              Nuova variante
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={openCreateValueModal}>
              Nuovo valore
            </button>
          </div>
        }
      />

      <div className="row g-4 variants-page">
        <div className="col-lg-5">
          <div className="card shadow-2-strong variants-panel-card variants-panel-left">
            <div className="card-body">
              <div className="variants-panel-head">
                <div>
                  <h5>Varianti</h5>
                  <small>Seleziona la variante per vedere i valori associati</small>
                </div>
                <span className="variants-count-pill">{variants.length}</span>
              </div>

              <div className="variants-search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cerca variante..."
                  value={variantSearch}
                  onChange={(e) => setVariantSearch(e.target.value)}
                />
              </div>

              {filteredVariants.length > 0 ? (
                <div className="variants-list">
                  {filteredVariants.map((variant) => (
                    <div
                      key={variant.id}
                      className={`variant-row-card ${activeVariantId === variant.id ? 'is-active' : ''}`}
                    >
                      <button type="button" className="variant-row-main" onClick={() => setActiveVariantId(variant.id)}>
                        <div className="variant-row-title-wrap">
                          <strong>{variant.name}</strong>
                          <small>ID #{variant.id}</small>
                        </div>
                        <span className="variant-values-badge">
                          {(valuesByVariantId[variant.id] || []).length} valori
                        </span>
                      </button>

                      <div className="action-buttons">
                        <button
                          type="button"
                          className="action-icon-btn action-edit"
                          onClick={() => openEditVariantModal(variant)}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <ButtonDelete type="button" onClick={() => openDeleteVariantModal(variant)} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="variants-empty-state">
                  <i className="fa-regular fa-folder-open"></i>
                  <span>Nessuna variante trovata</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow-2-strong variants-panel-card">
            <div className="card-body">
              <div className="variants-panel-head">
                <div>
                  <h5>Valori variante</h5>
                  <small>Elenco valori associati alla variante selezionata</small>
                </div>
                <span className="variants-count-pill">{displayedValues.length}</span>
              </div>

              <div className="variants-toolbar">
                <div className="variants-selected-chip">
                  <span>Variante attiva:</span>
                  <strong>{activeVariant ? activeVariant.name : 'Tutte'}</strong>
                </div>

                <div className="variants-search">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cerca valore..."
                    value={valueSearch}
                    onChange={(e) => setValueSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-overview-strip">
                <div className="admin-overview-item">
                  <small>Totale valori</small>
                  <strong>{displayedValues.length}</strong>
                </div>
                <div className="admin-overview-item">
                  <small>Variante selezionata</small>
                  <strong>{activeVariant ? activeVariant.name : 'Tutte'}</strong>
                </div>
                <div className="admin-overview-item">
                  <small>Ricerca attiva</small>
                  <strong>{valueSearch ? 'Si' : 'No'}</strong>
                </div>
              </div>

              <div className="admin-list-toolbar">
                <p className="mb-0">
                  Ogni valore rappresenta una scelta concreta della variante, ad esempio colore o taglia.
                </p>
              </div>

              <div className="table-responsive admin-table-shell">
                <table className="table table-hover mb-0 admin-table variants-values-table">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Variante</th>
                      <th scope="col">Valore</th>
                      <th scope="col" className="text-center">
                        Operazioni
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedValues.length > 0 ? (
                      displayedValues.map((variantValue) => (
                        <tr key={variantValue.id} className="align-middle">
                          <td>#{variantValue.id}</td>
                          <td>
                            <span className="variant-values-badge">
                              {variantNameById[variantValue.product_variant_id] || 'N/D'}
                            </span>
                          </td>
                          <td>
                            <span className="variant-value-pill">{variantValue.value}</span>
                          </td>
                          <td className="text-center">
                            <div className="action-buttons justify-content-center">
                              <ButtonDelete type="button" onClick={() => openDeleteValueModal(variantValue)} />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Nessun valore disponibile
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminDialog
        isOpen={modal.type === 'createVariant'}
        onClose={closeModal}
        title="Nuova Variante"
        subtitle="Crea una nuova caratteristica prodotto."
        icon="fa-circle-plus"
        footer={
          <div className="variants-form-actions">
            <button type="submit" form="create-variant-form" className="btn cb-primary" disabled={modalProcessing}>
              {modalProcessing ? 'Salvataggio...' : 'Salva Variante'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Annulla
            </button>
          </div>
        }
      >
        <form id="create-variant-form" onSubmit={submitCreateVariant} className="variants-form-grid">
          <div>
            <label htmlFor="create_variant_name" className="form-label">
              Nome variante
            </label>
            <input
              id="create_variant_name"
              type="text"
              className="form-control"
              placeholder="Es. Colore, Taglia, Materiale"
              value={createVariantData.name}
              onChange={(e) => setCreateVariantData({ name: e.target.value })}
              required
            />
            {modalErrors.name && <small className="text-danger">{modalErrors.name}</small>}
          </div>
        </form>
      </AdminDialog>

      <AdminDialog
        isOpen={modal.type === 'editVariant'}
        onClose={closeModal}
        title="Modifica Variante"
        subtitle={editingVariant ? `Stai modificando: ${editingVariant.name}` : 'Aggiorna nome variante'}
        icon="fa-pen-to-square"
        footer={
          <div className="variants-form-actions">
            <button type="submit" form="edit-variant-form" className="btn cb-primary" disabled={modalProcessing}>
              {modalProcessing ? 'Aggiornamento...' : 'Aggiorna Variante'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Annulla
            </button>
          </div>
        }
      >
        <form id="edit-variant-form" onSubmit={submitEditVariant} className="variants-form-grid">
          <div>
            <label htmlFor="edit_variant_name" className="form-label">
              Nome variante
            </label>
            <input
              id="edit_variant_name"
              type="text"
              className="form-control"
              value={editVariantData.name}
              onChange={(e) => setEditVariantData({ name: e.target.value })}
              required
            />
            {modalErrors.name && <small className="text-danger">{modalErrors.name}</small>}
          </div>
        </form>
      </AdminDialog>

      <AdminDialog
        isOpen={modal.type === 'createValue'}
        onClose={closeModal}
        title="Nuovo Valore"
        subtitle="Associa un valore a una variante esistente."
        icon="fa-tag"
        footer={
          <div className="variants-form-actions">
            <button type="submit" form="create-value-form" className="btn cb-primary" disabled={modalProcessing}>
              {modalProcessing ? 'Salvataggio...' : 'Salva Valore'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Annulla
            </button>
          </div>
        }
      >
        <form id="create-value-form" onSubmit={submitCreateValue} className="variants-form-grid">
          <div>
            <label htmlFor="create_value_variant_id" className="form-label">
              Variante
            </label>
            <select
              id="create_value_variant_id"
              className="form-select"
              value={createValueData.product_variant_id}
              onChange={(e) => setCreateValueData((prev) => ({ ...prev, product_variant_id: e.target.value }))}
              required
            >
              <option value="">Seleziona una variante</option>
              {variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name}
                </option>
              ))}
            </select>
            {modalErrors.product_variant_id && <small className="text-danger">{modalErrors.product_variant_id}</small>}
          </div>

          <div>
            <label htmlFor="create_value_name" className="form-label">
              Valore
            </label>
            <input
              id="create_value_name"
              type="text"
              className="form-control"
              placeholder="Es. Rosso, XL, Cotone"
              value={createValueData.name}
              onChange={(e) => setCreateValueData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
            {modalErrors.name && <small className="text-danger">{modalErrors.name}</small>}
          </div>
        </form>
      </AdminDialog>

      <AdminDialog
        isOpen={modal.type === 'deleteVariant' || modal.type === 'deleteValue'}
        onClose={closeModal}
        title={modal.type === 'deleteVariant' ? 'Elimina Variante' : 'Elimina Valore'}
        subtitle={
          modal.type === 'deleteVariant'
            ? 'Questa azione non può essere annullata.'
            : 'Conferma la rimozione del valore selezionato.'
        }
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
          {modal.type === 'deleteVariant' ? (
            <span>
              Stai per eliminare la variante <strong>{modal.payload?.name}</strong>.
            </span>
          ) : (
            <span>
              Stai per eliminare il valore <strong>{modal.payload?.value}</strong>.
            </span>
          )}
        </div>
      </AdminDialog>
    </Layout>
  );
};

export default ProductVariantsContent;
