import Layout from "@/Layouts/Admin/Layout";
import AlbumPhotoSelect from "@/components/Admin/Albums/AlbumPhotoSelect";
import InputErrors from "@/components/Admin/InputErrors";
import PhotoFileUpload from "@/components/Admin/PhotoFileUpload";
import { Link, useForm, usePage } from '@inertiajs/react';

const PhotoCreate = ({ photo, albums }) => {

    const urlParams = new URLSearchParams(window.location.search);
    const album_id = urlParams.get('album_id');

    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        album_id: album_id ?? '',
        img_path: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleFileChange = (file) => {
        if (file) {
            setData('img_path', file);
        } else if (Array.from(file).length > 1) {
            const files = Array.from(file);
            setData('img_path', files);
        } else {
            setData('img_path', null);
        }
    }

    const handleAlbumChange = (albumId) => {
        setData('album_id', albumId);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('photos.store'));
    }

    return (
        <Layout>
            <h2>Inserisci nuova immagine</h2>
            <InputErrors errors={errors} />

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label htmlFor="name">Titolo immagine</label>
                    <input type="text" name="name" id="name" className="form-control" placeholder="Titolo immagine" value={data.name} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="description">Descrizione</label>
                    <textarea name="description" id="description" className="form-control" placeholder="Descrizione" value={data.description} onChange={handleChange}></textarea>
                </div>

                <AlbumPhotoSelect albums={albums} album_id={album_id} handleAlbumChange={handleAlbumChange} />
                <PhotoFileUpload handleFileChange={handleFileChange} />

                <div className="mb-3">
                    <button type="submit" className="btn cb-primary me-3">Inserisci</button>

                    {album_id != '' ?
                        <Link href={route('albums.photos', album_id)} className="btn btn-secondary">Torna indietro</Link>
                        :
                        <Link href={route('albums')} className="btn btn-secondary">Torna indietro</Link>
                    }
                </div>
            </form>
        </Layout >
    )
}

export default PhotoCreate;