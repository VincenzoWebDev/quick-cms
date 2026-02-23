import Layout from "@/Layouts/Admin/Layout";
import { Link, useForm } from '@inertiajs/react';
import AlertErrors from '@/components/Admin/AlertErrors';
import { useState, useEffect } from 'react'
import { STORAGE_URL, BASE_URL } from "@/constants/constants";
import Fancybox from "@/components/Admin/Fancybox";
import { SectionHeader } from "@/components/Admin/Index";


const AlbumPhotosContent = ({ album, photos, flash }) => {
    const { delete: formDelete } = useForm();
    const [message, setMessage] = useState(flash.message);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const PhotoId = e.target.id;
        formDelete(route('photos.destroy', PhotoId), {
            onSuccess: () => {
                setMessage({ tipo: 'success', testo: `Foto ${PhotoId} cancellata correttamente` });
            },
            onError: () => {
                setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione della foto ${PhotoId}` });
            }
        })
    }
    
    return (
        <Layout>
            <SectionHeader
                title={`Immagini album: ${album.album_name}`}
                subtitle="Gestione immagini e manutenzione della galleria selezionata."
                primaryAction={
                    <Link href={route('photos.create', { 'album_id': album.id })} className="btn cb-primary">
                        Inserisci nuova immagine
                    </Link>
                }
            />
            <AlertErrors message={message} />

            <div className="card shadow-2-strong">
                <div className="card-body">
                    <Fancybox
                        options={{
                            Carousel: { infinite: false, },
                            transition: "slide",
                        }}>
                        <div className="row">
                            {photos.length > 0 ? (
                                photos.map((photo) =>
                                    <div className="col-lg-2 col-md-3 col-6 thumb" key={photo.id}>
                                        <div className="overflow-hidden">
                                            <a data-fancybox="gallery" href={STORAGE_URL + photo.img_path} className="d-block h-100">
                                                <img src={STORAGE_URL + photo.thumb_path} alt={photo.name} title={photo.name} className="img-fluid img-thumbnail" />
                                            </a>
                                            <div className="container-operation">
                                                <Link href={route('photos.edit', photo.id)} className="btn px-2">
                                                    <div className="over-icon">
                                                        <img src={`${BASE_URL}img/icons/edit.png`} alt="edit" width={40} className="original" />
                                                        <img src={`${BASE_URL}img/icons/edit-over.png`} alt="edit" width={40} className='overized' />
                                                    </div>
                                                </Link>
                                                <form onSubmit={handleSubmit} id={photo.id} className="d-inline">
                                                    <button className="btn px-2">
                                                        <div className="over-icon">
                                                            <img src={`${BASE_URL}img/icons/delete.png`} alt="delete" width={40} className="original" />
                                                            <img src={`${BASE_URL}img/icons/delete-over.png`} alt="delete" width={40} className='overized' />
                                                        </div>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div>Non ci sono immagini</div>
                            )}
                        </div>
                    </Fancybox>
                </div>
            </div>
            <div className="mb-3">
                <Link href={route('albums')} className="btn btn-secondary">Torna indietro</Link>
            </div>
        </Layout >
    )
}

export default AlbumPhotosContent;
