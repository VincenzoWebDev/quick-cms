import Layout from "@/Layouts/Admin/Layout";
import AlertErrors from "@/components/Admin/AlertErrors";
import { STORAGE_URL } from "@/constants/constants";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const FilesContent = ({ files, flash }) => {
    const MySwal = withReactContent(Swal);
    const [message, setMessage] = useState(flash.message);
    const { delete: formDelete } = useForm();
    const { get } = useForm();
    const { url } = usePage();

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    // Funzione per verificare lo se il link finisce con una determinata stringa RETURN -> BOOL
    const endLink = (path) => {
        return url.endsWith(path);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fileName = e.target.dataset.name;
        if (fileName) {
            MySwal.fire({
                title: "Sei sicuro di voler eliminare questo file?",
                text: "Non sarà possibile annullare questa operazione!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--bs-cobalto)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, elimina!",
                cancelButtonText: "Annulla",
            }).then((result) => {
                if (result.isConfirmed) {
                    formDelete(route('files.destroy', { 'fileName': fileName }), {
                        onSuccess: () => {
                            setMessage({ tipo: 'success', testo: `File: ${fileName} - cancellato correttamente` });
                        },
                        onError: () => {
                            setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione del file: ${fileName}` });
                        }
                    })
                }
            })
        }
    }
    const handleFilePreview = (e) => {
        e.preventDefault();
        const fileName = e.currentTarget.dataset.name;
        if (fileName.includes('pdf') || fileName.includes('ppt') || fileName.includes('doc') || fileName.includes('docx') || fileName.includes('pptx') || fileName.includes('xlsx')) {
            Swal.fire({
                title: '<strong>File preview</strong>',
                html: '<iframe src="' + `${STORAGE_URL}uploads/${fileName}` + '" frameborder="0" style="width: 100%; height: 600px;"></iframe>',
                showCloseButton: true,
                showConfirmButton: false,
            })
        }

        if (fileName.includes('mp4')) {
            Swal.fire({
                title: '<strong>Video preview</strong>',
                html:
                    `<video src="${STORAGE_URL}uploads/${fileName}" controls autoplay style="width: 100%" alt="${fileName}" title="${fileName}"></video>`,
                showCloseButton: true,
                showConfirmButton: false,
            })
        }
        if (fileName.includes('jpg') || fileName.includes('png') || fileName.includes('jpeg') || fileName.includes('gif') || fileName.includes('webp')) {
            Swal.fire({
                title: "<strong>Image preview</strong>",
                html: `<img src="${STORAGE_URL}uploads/${fileName}" style="width: 100%; height: auto;" alt="${fileName}" title="${fileName}" />`,
                showConfirmButton: false,
                showCloseButton: true,
            })
        }
    }

    const handleDownload = (e) => {
        e.preventDefault();
        const imageName = e.currentTarget.dataset.name;
        get(route('files.download', { 'fileName': imageName, 'res': true }),
            {
                onSuccess: (res) => {
                    const blob = new Blob([res], { type: 'application/octet-stream' });

                    // Crea un URL per il blob
                    const url = window.URL.createObjectURL(blob);

                    // Crea un link per il download e simula il clic
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', imageName);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                },
                onError: (res) => {
                    console.log(res);
                }
            }
        );
    }

    const handleCreateFile = async (e) => {
        e.preventDefault();
        const { value: file } = await MySwal.fire({
            title: "Seleziona un file",
            input: "file",
            confirmButtonText: 'Carica',
            confirmButtonColor: 'var(--bs-primary)',
            inputAttributes: {
                "accept": "image/*,video/*,application/pdf,application/vnd.ms-powerpoint,application/msword",
                "aria-label": "Carica un file",
            }
        });
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            router.post(route('files.store'), formData, {
                onSuccess: () => {
                    setMessage({ tipo: 'success', testo: 'File inserito correttamente' });
                },
                onError: () => {
                    setMessage({ tipo: 'danger', testo: 'Errore durante l\'inserimento del file' });
                }
            })
        }
    }

    return (
        <Layout>
            <h2>Gestione files</h2>
            <AlertErrors message={message} />

            <div className="row">
                <div className="col-12 col-lg-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-grid">
                                <button onClick={handleCreateFile} className="btn cb-primary mb-3">Inserisci nuovo file</button>
                            </div>
                            <h5 className="my-2">Elenco file</h5>
                            <div className="fm-menu">
                                <div className="list-group list-group-flush">
                                    <Link href={route('files')} className={`list-group-item py-1 d-flex align-items-center ${endLink('/files') ? `item-active` : ``}`}>
                                        <i className="fas fa-inbox me-3"></i><span>Tutti i file</span>
                                        {endLink('/files') ? <i className="fas fa-chevron-right ms-auto"></i> : ''}
                                    </Link>
                                    <Link href={route('files.documents')} className={`list-group-item py-1 d-flex align-items-center ${endLink('/files/documents') ? `item-active` : ``}`}>
                                        <i className="fas fa-folder me-3"></i><span>Documenti</span>
                                        {endLink('files/documents') ? <i className="fas fa-chevron-right ms-auto"></i> : ''}
                                    </Link>
                                    <Link href={route('files.images')} className={`list-group-item py-1 d-flex align-items-center ${endLink('/files/images') ? `item-active` : ``}`}>
                                        <i className="fas fa-image me-3"></i><span>Immagini</span>
                                        {endLink('/files/images') ? <i className="fas fa-chevron-right ms-auto"></i> : ''}
                                    </Link>
                                    <Link href={route('files.video')} className={`list-group-item py-1 d-flex align-items-center ${endLink('/files/video') ? `item-active` : ``}`}>
                                        <i className="fas fa-video me-3"></i><span>Video</span>
                                        {endLink('/files/video') ? <i className="fas fa-chevron-right ms-auto"></i> : ''}
                                    </Link>
                                    {/* <a href="#" className="list-group-item py-1"><i className="fas fa-file me-3"></i><span>File zip</span></a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-9">
                    <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                        <div className="card-body">
                            <div className="fm-search">
                                <div className="mb-0">
                                    <div className="input-group input-group-lg">	<span className="input-group-text bg-transparent"><i className="fa fa-search"></i></span>
                                        <input type="text" className="form-control" placeholder="Search the files" />
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th scope="col">Nome file</th>
                                            <th scope="col">Ultima modifica</th>
                                            <th scope="col">Operazioni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {files.length > 0 ? (
                                            files && files.map((file, index) => (
                                                <tr key={index} className="align-middle">
                                                    <th className="text-center">{index + 1}</th>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div><i className="bx bxs-file-pdf me-2 font-24 text-danger"></i>
                                                            </div>
                                                            <div className="font-weight-bold text-danger">{file.name}</div>
                                                        </div>
                                                    </td>
                                                    <td>{new Date(file.last_modified * 1000).toLocaleString()}</td>
                                                    <td className="d-flex align-items-center">
                                                        <button onClick={handleFilePreview} data-name={file.name} className="btn btn-sm btn-success me-2">
                                                            <i className="fa fa-eye"></i>
                                                        </button>
                                                        <button onClick={handleDownload} data-name={file.name} className="btn btn-sm btn-primary me-2">
                                                            <i className="fa fa-download"></i>
                                                        </button>
                                                        <form onSubmit={handleSubmit} action="#" method="POST" data-name={file.name}>
                                                            <button type="submit" className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></button>
                                                        </form>
                                                    </td>
                                                </tr>

                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan='4' className="text-center">Nessun file presente</td>
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
    )
}

export default FilesContent;