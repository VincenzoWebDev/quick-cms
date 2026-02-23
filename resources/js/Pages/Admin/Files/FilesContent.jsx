import Layout from '@/Layouts/Admin/Layout';
import { STORAGE_URL } from '@/constants/constants';
import { SectionHeader } from '@/components/Admin/Index';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

const documentExtensions = ['pdf', 'ppt', 'doc', 'docx', 'pptx', 'xlsx', 'txt', 'csv'];
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
const videoExtensions = ['mp4', 'mov', 'avi', 'webm', 'mkv'];

const getFileExtension = (fileName) => {
  const chunks = fileName.split('.');
  return chunks.length > 1 ? chunks.pop().toLowerCase() : '';
};

const getFileMeta = (fileName) => {
  const ext = getFileExtension(fileName);

  if (imageExtensions.includes(ext)) {
    return { label: 'Immagine', icon: 'fa-file-image', chipClass: 'chip-image' };
  }

  if (videoExtensions.includes(ext)) {
    return { label: 'Video', icon: 'fa-file-video', chipClass: 'chip-video' };
  }

  if (documentExtensions.includes(ext)) {
    return { label: 'Documento', icon: 'fa-file-lines', chipClass: 'chip-document' };
  }

  return { label: 'Altro', icon: 'fa-file', chipClass: 'chip-other' };
};

const FilesContent = ({ files = [], flash }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSectionLoading, setIsSectionLoading] = useState(false);

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
  const { delete: formDelete } = useForm();
  const { get } = useForm();
  const { url } = usePage();

  const endLink = (path) => url.endsWith(path);

  const navigateToFiles = (targetRoute) => {
    if (typeof window !== 'undefined' && targetRoute === window.location.href) {
      return;
    }
    setIsSectionLoading(true);
    router.get(targetRoute, {}, {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => setIsSectionLoading(false),
      onError: () => setIsSectionLoading(false),
    });
  };

  const stats = useMemo(() => {
    return files.reduce(
      (acc, file) => {
        const ext = getFileExtension(file.name);

        acc.total += 1;

        if (imageExtensions.includes(ext)) {
          acc.images += 1;
        } else if (videoExtensions.includes(ext)) {
          acc.videos += 1;
        } else if (documentExtensions.includes(ext)) {
          acc.documents += 1;
        } else {
          acc.others += 1;
        }

        return acc;
      },
      { total: 0, documents: 0, images: 0, videos: 0, others: 0 }
    );
  }, [files]);

  const filteredFiles = useMemo(() => {
    if (!searchQuery) {
      return files;
    }

    const normalized = searchQuery.toLowerCase().trim();
    return files.filter((file) => file.name.toLowerCase().includes(normalized));
  }, [files, searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileName = e.currentTarget.dataset.name;

    if (!fileName) {
      return;
    }

    MySwal.fire({
      title: 'Sei sicuro di voler eliminare questo file?',
      text: 'Non sarà possibile annullare questa operazione!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-cobalto)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!',
      cancelButtonText: 'Annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        formDelete(route('files.destroy', { fileName }), {
          onSuccess: () => {
            toast.success(`File: ${fileName} - cancellato correttamente`);
          },
          onError: () => {
            toast.error(`Errore durante la cancellazione del file: ${fileName}`);
          },
        });
      }
    });
  };

  const handleFilePreview = (e) => {
    e.preventDefault();
    const fileName = e.currentTarget.dataset.name;
    const ext = getFileExtension(fileName);

    if (documentExtensions.includes(ext)) {
      Swal.fire({
        title: '<strong>File preview</strong>',
        html: `<iframe src="${STORAGE_URL}uploads/${fileName}" frameborder="0" style="width: 100%; height: 600px;"></iframe>`,
        showCloseButton: true,
        showConfirmButton: false,
      });
      return;
    }

    if (videoExtensions.includes(ext)) {
      Swal.fire({
        title: '<strong>Video preview</strong>',
        html: `<video src="${STORAGE_URL}uploads/${fileName}" controls autoplay style="width: 100%" alt="${fileName}" title="${fileName}"></video>`,
        showCloseButton: true,
        showConfirmButton: false,
      });
      return;
    }

    if (imageExtensions.includes(ext)) {
      Swal.fire({
        title: '<strong>Image preview</strong>',
        html: `<img src="${STORAGE_URL}uploads/${fileName}" style="width: 100%; height: auto;" alt="${fileName}" title="${fileName}" />`,
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const imageName = e.currentTarget.dataset.name;

    get(route('files.download', { fileName: imageName, res: true }), {
      onSuccess: (res) => {
        const blob = new Blob([res], {
          type: 'application/octet-stream',
        });

        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', imageName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    });
  };

  const handleCreateFile = async (e) => {
    e.preventDefault();

    const { value: file } = await MySwal.fire({
      title: 'Seleziona un file',
      html: `
        <div class="swal-file-upload-wrap">
          <input id="swal_file_upload" type="file" class="swal-file-upload-input" />
          <label for="swal_file_upload" class="swal-file-upload-trigger">
            <i class="fa-solid fa-upload"></i>
            <span>Scegli file</span>
          </label>
          <small id="swal_file_upload_name" class="swal-file-upload-name">Nessun file selezionato</small>
        </div>
      `,
      confirmButtonText: 'Carica',
      confirmButtonColor: 'var(--bs-primary)',
      didOpen: () => {
        const input = document.getElementById('swal_file_upload');
        const nameNode = document.getElementById('swal_file_upload_name');
        if (!input || !nameNode) return;
        input.setAttribute(
          'accept',
          'image/*,video/*,application/pdf,application/vnd.ms-powerpoint,application/msword'
        );
        input.addEventListener('change', () => {
          const selectedFile = input.files && input.files[0];
          nameNode.textContent = selectedFile ? selectedFile.name : 'Nessun file selezionato';
        });
      },
      preConfirm: () => {
        const input = document.getElementById('swal_file_upload');
        const selectedFile = input && input.files ? input.files[0] : null;
        if (!selectedFile) {
          MySwal.showValidationMessage('Seleziona un file prima di continuare');
          return false;
        }
        return selectedFile;
      },
    });

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    router.post(route('files.store'), formData, {
      onSuccess: () => {
        toast.success(`File: ${file.name} - inserito correttamente`);
      },
      onError: () => {
        toast.error(`Errore durante l'inserimento del file: ${file.name}`);
      },
    });
  };

  return (
    <Layout>
      <SectionHeader
        title="Gestione files"
        subtitle="Archivio centralizzato con ricerca rapida e azioni di manutenzione."
      />

      <div className="row g-3 mb-3 files-stats-row">
        <div className="col-md-3 col-6">
          <div className="card files-stat-card">
            <div className="card-body">
              <span className="files-stat-label">Totale file</span>
              <h4>{isSectionLoading ? <span className="files-stat-skeleton"></span> : stats.total}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card files-stat-card">
            <div className="card-body">
              <span className="files-stat-label">Documenti</span>
              <h4>{isSectionLoading ? <span className="files-stat-skeleton"></span> : stats.documents}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card files-stat-card">
            <div className="card-body">
              <span className="files-stat-label">Immagini</span>
              <h4>{isSectionLoading ? <span className="files-stat-skeleton"></span> : stats.images}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card files-stat-card">
            <div className="card-body">
              <span className="files-stat-label">Video</span>
              <h4>{isSectionLoading ? <span className="files-stat-skeleton"></span> : stats.videos}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-3">
          <div className="card files-side-card h-100">
            <div className="card-body">
              <button onClick={handleCreateFile} className="btn cb-primary w-100 mb-3">
                <i className="fa-solid fa-upload me-2"></i>
                Carica file
              </button>

              <h5 className="files-side-title">Categorie storage</h5>

              <div className="fm-menu">
                <div className="list-group list-group-flush files-nav-list">
                  <button
                    type="button"
                    onClick={() => navigateToFiles(route('files'))}
                    className={`list-group-item d-flex align-items-center ${endLink('/files') ? 'item-active' : ''}`}
                  >
                    <i className="fa-regular fa-folder-open me-2"></i>
                    <span>Tutti i file</span>
                    {endLink('/files') && <i className="fas fa-chevron-right ms-auto"></i>}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToFiles(route('files.documents'))}
                    className={`list-group-item d-flex align-items-center ${endLink('/files/documents') ? 'item-active' : ''}`}
                  >
                    <i className="fa-regular fa-file-lines me-2"></i>
                    <span>Documenti</span>
                    {endLink('/files/documents') && <i className="fas fa-chevron-right ms-auto"></i>}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToFiles(route('files.images'))}
                    className={`list-group-item d-flex align-items-center ${endLink('/files/images') ? 'item-active' : ''}`}
                  >
                    <i className="fa-regular fa-image me-2"></i>
                    <span>Immagini</span>
                    {endLink('/files/images') && <i className="fas fa-chevron-right ms-auto"></i>}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToFiles(route('files.video'))}
                    className={`list-group-item d-flex align-items-center ${endLink('/files/video') ? 'item-active' : ''}`}
                  >
                    <i className="fa-regular fa-circle-play me-2"></i>
                    <span>Video</span>
                    {endLink('/files/video') && <i className="fas fa-chevron-right ms-auto"></i>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-9">
          <div className="card shadow-2-strong files-main-card">
            <div className="card-body">
              <div className="files-header-row">
                <div>
                  <h5 className="mb-1">Archivio file</h5>
                  <small>Gestisci anteprima, download ed eliminazione in un unico spazio</small>
                </div>
                <div className="files-search-box">
                  <span className="input-group-text bg-transparent">
                    <i className="fa fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cerca file..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="table-responsive admin-table-shell mt-3">
                <table className="table table-hover mb-0 admin-table files-table">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th scope="col">Nome file</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Ultima modifica</th>
                      <th scope="col" className="text-center">
                        Operazioni
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isSectionLoading ? (
                      [...Array(6)].map((_, index) => (
                        <tr key={`files-skeleton-row-${index}`}>
                          <td colSpan="5" className="py-2">
                            <div className="files-row-skeleton"></div>
                          </td>
                        </tr>
                      ))
                    ) : filteredFiles.length > 0 ? (
                      filteredFiles.map((file, index) => {
                        const meta = getFileMeta(file.name);

                        return (
                          <tr key={file.name} className="align-middle">
                            <th className="text-center">{index + 1}</th>
                            <td>
                              <div className="file-name-cell">
                                <span className={`file-type-icon ${meta.chipClass}`}>
                                  <i className={`fa-regular ${meta.icon}`}></i>
                                </span>
                                <strong className="file-name-text">{file.name}</strong>
                              </div>
                            </td>
                            <td>
                              <span className={`file-type-chip ${meta.chipClass}`}>{meta.label}</span>
                            </td>
                            <td>{new Date(file.last_modified * 1000).toLocaleString()}</td>
                            <td className="text-center">
                              <div className="action-buttons justify-content-center">
                                <button
                                  onClick={handleFilePreview}
                                  data-name={file.name}
                                  className="action-icon-btn action-show"
                                  type="button"
                                  title="Anteprima"
                                >
                                  <i className="fa-regular fa-eye"></i>
                                </button>
                                <button
                                  onClick={handleDownload}
                                  data-name={file.name}
                                  className="action-icon-btn action-download"
                                  type="button"
                                  title="Download"
                                >
                                  <i className="fa-solid fa-download"></i>
                                </button>
                                <form onSubmit={handleSubmit} method="POST" data-name={file.name} className="d-inline">
                                  <button type="submit" className="action-icon-btn action-delete" title="Elimina">
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </form>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          Nessun file presente
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
    </Layout>
  );
};

export default FilesContent;
