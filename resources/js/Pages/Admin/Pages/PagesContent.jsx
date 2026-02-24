import Layout from '@/Layouts/Admin/Layout';
import { ButtonDelete, ButtonEdit, ButtonShow, PageDelete, PageDeleteSelected, SectionHeader } from '@/components/Admin/Index';
import { useEffect, useMemo, useState } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import { toast } from 'react-toastify';

const PageContent = ({ pages, flash }) => {
  const { delete: formDelete } = useForm();
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    const pageId = e.target.dataset.pageId;
    const active = e.target.checked ? 1 : 0;
    // Invia una richiesta al server per aggiornare lo stato del tema
    router.post(
      route('pages.switch', { pageId }),
      { active },
      {
        onSuccess: () => {
          toast.success(`Pagina ${active === 0 ? 'disattivata' : 'attivata'} correttamente`);
        },
        onError: () => {
          toast.error(`Errore durante l'attivazione/disattivazione della pagina`);
        },
      }
    );
  };

  const handleCheckboxChange = (e, pageId) => {
    if (e.target.checked) {
      setSelectedRecords((prevSelectedRecords) => [...prevSelectedRecords, pageId]);
    } else {
      setSelectedRecords((prevSelectedRecords) => prevSelectedRecords.filter((id) => id !== pageId));
    }
  };

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    const allRecordIds = pages.data.map((page) => page.id);
    if (isChecked) {
      setSelectedRecords(allRecordIds);
    } else {
      setSelectedRecords([]);
    }
  };

  const handleDelete = (e) => {
    PageDelete({ e, formDelete });
  };

  const handleDeleteSelected = (e) => {
    PageDeleteSelected({ e, formDelete, selectedRecords, setSelectedRecords, setSelectAll });
  };

  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return pages.data;
    const normalized = searchQuery.toLowerCase().trim();
    return pages.data.filter(
      (page) =>
        page.title.toLowerCase().includes(normalized) ||
        page.slug.toLowerCase().includes(normalized) ||
        page.layout?.name?.toLowerCase().includes(normalized)
    );
  }, [pages.data, searchQuery]);

  const activePagesCount = pages.data.filter((page) => Boolean(page.active)).length;
  const totalPages = pages.total ?? pages.data.length;

  return (
    <Layout>
      <SectionHeader
        title="Gestione pagine"
        subtitle="Amministra pagine statiche, layout e stato di pubblicazione."
        primaryAction={
          <Link href={route('pages.create')} className="btn cb-primary">
            Inserisci nuova pagina
          </Link>
        }
        showBulkAction={selectedRecords.length > 0}
        bulkCount={selectedRecords.length}
        onBulkAction={handleDeleteSelected}
      />

      <div className="card shadow-2-strong">
        <div className="card-body">
          <div className="pages-overview-strip">
            <div className="pages-overview-item">
              <small>Totale pagine</small>
              <strong>{totalPages}</strong>
            </div>
            <div className="pages-overview-item">
              <small>Pagine attive</small>
              <strong>{activePagesCount}</strong>
            </div>
            <div className="pages-overview-item">
              <small>Selezionate</small>
              <strong>{selectedRecords.length}</strong>
            </div>
          </div>

          <div className="pages-toolbar">
            <p className="mb-0">Gestisci contenuti, layout e pubblicazione da un unico elenco.</p>
            <div className="col-auto cont-searchInput pages-search-inline">
              <div className="d-flex align-items-center gap-2">
                <input
                  type="search"
                  className="form-control"
                  style={{ width: '230px', paddingRight: '36px' }}
                  placeholder="Cerca..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fa-solid fa-magnifying-glass" id="searchIcon"></i>
              </div>
            </div>
          </div>

          <div className="table-responsive admin-table-shell">
            <table className="table table-hover mb-0 admin-table pages-table">
              <thead>
                <tr>
                  <th scope="col">
                    <div className="form-check d-flex justify-content-center align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={selectAll}
                        onChange={handleSelectAllChange}
                        checked={selectAll}
                      />
                    </div>
                  </th>
                  <th scope="col">Id</th>
                  <th scope="col">Pagina</th>
                  <th scope="col">SEO / Descrizione</th>
                  <th scope="col">Stato</th>
                  <th scope="col">Aggiornato il</th>
                  <th scope="col" className="text-center">
                    Operazioni
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPages.length > 0 ? (
                  filteredPages.map((page) => (
                    <tr key={page.id} className="align-middle">
                      <th scope="row" className="col-md-1">
                        <div className="form-check d-flex justify-content-center align-items-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={page.id}
                            onChange={(e) => handleCheckboxChange(e, page.id)}
                            checked={selectedRecords.includes(page.id)}
                          />
                        </div>
                      </th>
                      <th scope="row" className="col-md-1">
                        #{page.id}
                      </th>
                      <td scope="row" className="col-md-3">
                        <div className="pages-title-cell">
                          <strong>{page.title}</strong>
                          <small>/{page.slug}</small>
                          <span className="pages-layout-badge">{page.layout?.name || 'Layout non assegnato'}</span>
                        </div>
                      </td>
                      <td scope="row" className="col-md-3">
                        <span className="pages-description-text">{page.meta_description || 'Nessuna descrizione'}</span>
                      </td>
                      <td scope="row">
                        <div className="d-flex align-items-center gap-2">
                          <span className={`pages-status-badge ${page.active ? 'is-active' : 'is-inactive'}`}>
                            {page.active ? 'Attiva' : 'Bozza'}
                          </span>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input page-switch"
                              type="checkbox"
                              role="switch"
                              id={`flexSwitchCheckDefault${page.id}`}
                              data-page-id={page.id}
                              checked={page.active}
                              onChange={handleSwitchChange}
                            />
                          </div>
                        </div>
                      </td>
                      <td scope="row">{new Date(page.updated_at).toLocaleDateString()}</td>
                      <td scope="row" className="text-center">
                        <div className="action-buttons justify-content-center">
                          <Link href={route('pages.edit', page.id)} className="action-icon-link">
                            <ButtonEdit />
                          </Link>
                          <form onSubmit={handleDelete} className="d-inline" id={page.id}>
                            <ButtonDelete />
                          </form>
                          <a href={route('page.show', page.slug)} className="action-icon-link" target="_blank" rel="noreferrer">
                            <ButtonShow />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Non ci sono pagine
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

export default PageContent;
