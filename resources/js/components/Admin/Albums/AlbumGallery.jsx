import { STORAGE_URL } from "@/constants/constants";
import Fancybox from "../Fancybox";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AlbumGallery = ({ photos }) => {
    const MySwal = withReactContent(Swal);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const { delete: formDelete } = useForm();

    const handleCheckboxChange = (e, photoId) => {
        if (e.target.checked) {
            setSelectedRecords(prevSelectedRecords => [...prevSelectedRecords, photoId]);
        } else {
            setSelectedRecords(prevSelectedRecords => prevSelectedRecords.filter(id => id !== photoId));
        }
    };

    const handleDeleteSelected = (e) => {
        e.preventDefault();
        if (selectedRecords.length === 0) {
            toast.error('Nessuna immagine selezionata');
            return;
        }
        if (selectedRecords.length > 0) {
            MySwal.fire({
                title: "Sei sicuro di voler eliminare queste immagini?",
                text: "Non sarà possibile annullare questa operazione!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--bs-cobalto)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, elimina!",
                cancelButtonText: "Annulla",
            }).then((result) => {
                if (result.isConfirmed) {
                    formDelete(route('photos.destroy.batch', { recordIds: selectedRecords }), {
                        preserveScroll: true,
                        onSuccess: () => {
                            setSelectedRecords([]);
                            MySwal.fire({
                                title: "Immagini cancellate",
                                text: "Le immagini selezionate sono state cancellate con successo.",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        },
                        onError: () => {
                            MySwal.fire({
                                title: "Errore",
                                text: "Si è verificato un errore durante la cancellazione delle immagini.",
                                icon: "error",
                                confirmButtonColor: "var(--bs-cobalto)",
                                confirmButtonText: "OK",
                            });
                        }
                    });
                };
            })
        }
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        formDelete(route('photos.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <div className="mb-3">
                <div className="d-grid gap-3 d-md-flex mb-3">
                    <label className="form-label fw-bold my-2">Galleria</label>
                    {selectedRecords && selectedRecords.length > 0 &&
                        <button className='btn btn-danger' onClick={handleDeleteSelected}>Elimina selezionati</button>
                    }
                </div>
                <Fancybox
                    options={{
                        Carousel: { infinite: false },
                        transition: "slide",
                    }}>
                    <div className="row">
                        {photos.map((photo) => (
                            <div className="col-md-2" key={photo.id}>
                                <div className="card">
                                    <a data-fancybox="gallery" href={STORAGE_URL + photo.img_path} className="d-block">
                                        <img src={STORAGE_URL + photo.img_path} alt={photo.name} title={photo.name} className="card-img-top" />
                                    </a>
                                    <div className="card-body p-2 d-flex justify-content-between align-items-center">
                                        <div className="form-check d-flex justify-content-center align-items-center">
                                            <input className="form-check-input" type="checkbox" value={photo.id} style={{ borderColor: '#aaa' }}
                                                onChange={(e) => handleCheckboxChange(e, photo.id)}
                                                checked={selectedRecords.includes(photo.id)} />
                                        </div>
                                        <button className="btn btn-danger btn-sm" onClick={(e) => handleDelete(e, photo.id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Fancybox>
            </div>
        </>
    )
}

export default AlbumGallery;
