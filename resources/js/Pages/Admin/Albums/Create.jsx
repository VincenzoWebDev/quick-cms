import Layout from "@/Layouts/Admin/Layout";
import { Link, useForm } from '@inertiajs/react';
import { AlbumCategoryCombo, AlbumThumbUpload, AlbumTabs, GalleryUpload, InputErrors } from "@/components/Admin/Index";

const AlbumCreate = ({ categories }) => {
    const { data, setData, post, errors, processing } = useForm({
        album_name: '',
        description: '',
        categories: [],
        album_thumb: null,
        gallery: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleCatsChange = (cats) => {
        setData('categories', cats)
    }
    const handleThumbChange = (file) => {
        setData('album_thumb', file);
    }

    const handleGalleryChange = (files) => {
        if (Array.from(files).length === 1) {
            setData('gallery', files);
        } else if (Array.from(files).length > 1) {
            setData('gallery', files);
        } else {
            setData(null);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('albums.store'));
    }

    return (
        <Layout>
            <h2>Inserisci un nuovo album</h2>
            <InputErrors errors={errors} />

            <AlbumTabs />
            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade active show" id="info-tab-pane" role="tabpanel" aria-labelledby="info-tab" tabIndex="0">
                                <div className="mb-3">
                                    <label htmlFor="album_name">Nome album</label>
                                    <input type="text" name="album_name" id="album_name" className="form-control" placeholder="Nome album" value={data.album_name} onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description">Descrizione</label>
                                    <textarea name="description" id="description" className="form-control" placeholder="Descrizione" value={data.description} onChange={handleChange}></textarea>
                                </div>

                                <AlbumCategoryCombo categories={categories} handleCatsChange={handleCatsChange} />
                            </div>

                            <div className="tab-pane fade show" id="img-tab-pane" role="tabpanel" aria-labelledby="img-tab" tabIndex="0">
                                <AlbumThumbUpload handleThumbChange={handleThumbChange} />
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Immagini</label>
                                    <GalleryUpload handleGalleryChange={handleGalleryChange} />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <button className="btn cb-primary me-3" disabled={processing}>{processing ? 'In corso...' : 'Inserisci'}</button>
                            <Link href={route('albums')} className="btn btn-secondary">Torna indietro</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </Layout>
    )
}

export default AlbumCreate;