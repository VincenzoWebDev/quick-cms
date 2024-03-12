import Layout from "@/Layouts/Admin/Layout";
import { Link, useForm } from '@inertiajs/react';
import AlbumCategoryCombo from '@/components/Admin/AlbumCategoryCombo';
import InputErrors from '@/components/Admin/InputErrors';
import AlbumFileUpload from "@/components/Admin/AlbumFileUpload";

const AlbumCreate = ({ user_auth, album, categories, selectedCategory }) => {
    const { data, setData, post, errors } = useForm({
        album_name: '',
        description: '',
        categories: [],
        album_thumb: null
    });

    const handleChange = (e) => {
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
        post(route('albums.store'));
    }

    return (
        <>
            <Layout user_auth={user_auth}>
                <h2>Inserisci un nuovo album</h2>

                <InputErrors errors={errors} />

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="album_name">Nome album</label>
                        <input type="text" name="album_name" id="album_name" className="form-control" placeholder="Nome album" value={data.album_name} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description">Descrizione</label>
                        <textarea name="description" id="description" className="form-control" placeholder="Descrizione" value={data.description} onChange={handleChange}></textarea>
                    </div>

                    <AlbumCategoryCombo categories={categories} selectedCategory={selectedCategory} handleCatsChange={handleCatsChange} />
                    <AlbumFileUpload handleFileChange={handleFileChange} />

                    <div className="mb-3">
                        <button className="btn cb-primary me-3">Inserisci</button>
                        <Link href={route('albums')} className="btn btn-secondary">Torna indietro</Link>
                    </div>
                </form>
            </Layout>
        </>
    )
}

export default AlbumCreate;