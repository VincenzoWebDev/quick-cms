import { STORAGE_URL } from "@/constants/constants";
import Fancybox from "../Fancybox";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ProductGallery = ({ productImages }) => {
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
        formDelete(route('product.images.destroy.batch', { recordIds: selectedRecords }), {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedRecords([]);
                MySwal.fire({
                    title: "Immagini cancellate",
                    text: "Le immagini selezionate sono state cancellate con successo.",
                    icon: "success",
                    confirmButtonColor: "var(--bs-cobalto)",
                    confirmButtonText: "OK",
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

    const handleDelete = (e, id) => {
        e.preventDefault();
        formDelete(route('product.images.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                MySwal.fire({
                    title: "Immagine cancellata",
                    text: "L'immagine è stata cancellata con successo.",
                    icon: "success",
                    confirmButtonColor: "var(--bs-cobalto)",
                    confirmButtonText: "OK",
                });
            },
            onError: () => {
                MySwal.fire({
                    title: "Errore",
                    text: "Si è verificato un errore durante la cancellazione dell'immagine.",
                    icon: "error",
                    confirmButtonColor: "var(--bs-cobalto)",
                    confirmButtonText: "OK",
                });
            }
        });
    };

    return (
        <div className="mb-3">
            <div className="d-grid gap-3 d-md-flex mb-3">
                <label className="form-label fw-bold my-2">Galleria</label>
                {selectedRecords && selectedRecords.length > 0 &&
                    <button className='btn btn-danger' onClick={handleDeleteSelected}>Elimina selezionati</button>
                }
            </div>
            <Fancybox
                options={{
                    Carousel: { infinite: false, },
                    transition: "slide",
                }}>
                <div className="row">
                    {productImages.map((image) => (
                        <div className="col-md-2" key={image.id}>
                            <div className="card">
                                <div className="overflow-hidden">
                                    <a data-fancybox="gallery" href={STORAGE_URL + image.image_path} className="d-block">
                                        <img src={STORAGE_URL + image.image_path} alt={`Immagine ${image.id}`} title={`Immagine ${image.id}`} className="card-img-top" />
                                    </a>
                                    <div className="card-body p-2 d-flex justify-content-between align-items-center">
                                        <div className="form-check d-flex justify-content-center align-items-center">
                                            <input className="form-check-input" type="checkbox" value={image.id} style={{ borderColor: '#aaa' }}
                                                onChange={(e) => handleCheckboxChange(e, image.id)}
                                                checked={selectedRecords.includes(image.id)} />
                                        </div>
                                        <button className="btn btn-danger btn-sm" onClick={(e) => handleDelete(e, image.id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Fancybox>
        </div>
    )
}

export default ProductGallery;
