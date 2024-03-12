import Layout from "@/Layouts/Admin/Layout";
import AlbumCategoryCombo from "@/components/Admin/AlbumCategoryCombo";
import AlbumFileUpload from "@/components/Admin/AlbumFileUpload";
import InputErrors from "@/components/Admin/InputErrors";
import { Link, useForm, router, usePage } from "@inertiajs/react";
import { STORAGE_URL } from "@/constants/constants";

const AlbumEdit = ({ user_auth, album, categories, selectedCategory }) => {
    const { errors } = usePage().props;

    const { data, setData } = useForm({
        album_name: album.album_name,
        description: album.description,
        categories: selectedCategory,
        album_thumb: null,
    });

    const handleNameChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleDescriptionChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleCatsChange = (cats) => {
        setData('categories', cats)
    }

    const handleFileChange = (file) => {
        setData('album_thumb', file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('albums.update', album.id), {
            ...data,
            _method: 'patch',
            forceFormData: true,
        });
    }

    return (
        <>
            <Layout user_auth={user_auth}>
                <h2>Modifica album</h2>
                <InputErrors errors={errors} />

                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="album_name">Nome album</label>
                                <input type="text" name="album_name" id="album_name" className="form-control w-100"
                                    value={data.album_name} placeholder="Nome album" onChange={handleNameChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description">Descrizione</label>
                                <textarea name="description" id="description" className="form-control w-100" placeholder="Descrizione" onChange={handleDescriptionChange} value={data.description == null ? '' : data.description}>{data.description}</textarea>
                            </div>

                            <AlbumCategoryCombo categories={categories} selectedCategory={selectedCategory} handleCatsChange={handleCatsChange} />
                            <AlbumFileUpload album={album} handleFileChange={handleFileChange} />

                            <div className="mb-3">
                                <button className="btn cb-primary me-3">Modifica</button>
                                <Link href={route('albums')} className="btn btn-secondary">Torna indietro</Link>
                            </div>
                        </form>
                    </div>
                    {
                        album.album_thumb &&
                        <div className="col-md-4 text-center">
                            <p className="mb-3">Thumbnail</p>
                            <img src={album.album_thumb} title={album.album_name} alt={album.album_name}
                                width="300" className="img-fluid" />
                        </div>
                    }
                </div>
            </Layout>
        </>
    );
}

export default AlbumEdit;
