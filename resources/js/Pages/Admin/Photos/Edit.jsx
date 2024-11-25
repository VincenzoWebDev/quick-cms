import { useForm, Link, router, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Admin/Layout";
import InputErrors from "@/components/Admin/InputErrors";
import PhotoFileUpload from '@/components/Admin/PhotoFileUpload';
import { STORAGE_URL } from '@/constants/constants';

/**
 * Renders the photo edit page for the admin panel.
 *
 * @param {Object} photo - The photo object to be edited.
 * @param {Object[]} albums - The list of albums to be used in the album selection dropdown.
 * @returns {JSX.Element} - The rendered photo edit page.
 */
const PhotoEdit = ({ photo, albums }) => {
    const { data, setData, post, errors, processing } = useForm({
        _method: 'PATCH',
        name: photo.name,
        description: photo.description,
        album_id: photo.album_id,
        img_path: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleAlbumChange = (e) => {
        const value = e.target.value;
        setData('album_id', value);
    }

    const handleFileChange = (file) => {
        setData('img_path', file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('photos.update', photo.id));
    }

    return (
        <Layout>
            <h2>Modifica foto album</h2>
            <InputErrors errors={errors} />
            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="name">Titolo immagine</label>
                            <input type="text" name="name" id="name" className="form-control w-100" value={data.name} placeholder="Nome album" onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description">Descrizione</label>
                            <textarea name="description" id="description" className="form-control w-100" placeholder="Descrizione" value={data.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="album_id">Album</label>
                            <select className="form-select w-100" aria-label="Default select example" name="album_id" id="album_id" value={data.album_id} onChange={handleAlbumChange}>
                                {Object.keys(albums).map((key) => (
                                    <option key={key} value={albums[key].id}>{albums[key].album_name}</option>
                                ))}
                            </select>
                        </div>

                        <PhotoFileUpload handleFileChange={handleFileChange} />

                        <div className="mb-3">
                            <button className="btn cb-primary me-3" disabled={processing}>{processing ? 'In corso...' : 'Modifica'}</button>
                            <Link href={route('albums.photos', photo.album_id)} className="btn btn-secondary">Torna indietro</Link>
                        </div>
                    </form>
                </div>
                {
                    photo.img_path &&
                    <div className="col-md-4 text-center">
                        <p className="mb-3">Thumbnail</p>
                        <img src={STORAGE_URL + photo.thumb_path} title={photo.name} alt={photo.name} width="300" className='img-fluid' />
                    </div>
                }
            </div>
        </Layout >
    )
}

export default PhotoEdit;