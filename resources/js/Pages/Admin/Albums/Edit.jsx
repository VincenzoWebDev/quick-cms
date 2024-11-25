import Layout from "@/Layouts/Admin/Layout";
import { AlbumCategoryCombo, AlbumGallery, AlbumTabs, AlbumThumbUpload, GalleryUpload, InputErrors } from "@/components/Admin/Index";
import { STORAGE_URL } from "@/constants/constants";
import { Link, useForm } from "@inertiajs/react";

const AlbumEdit = ({ album, categories, selectedCategory }) => {
    const { data, setData, post, errors, processing } = useForm({
        _method: 'PATCH',
        album_name: album.album_name,
        description: album.description,
        categories: selectedCategory,
        album_thumb: null,
        gallery: [],
    });

    const handleInputChange = (e) => {
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
        post(route('albums.update', album.id));
    }

    return (
        <>
            <Layout>
                <h2>Modifica album</h2>
                <InputErrors errors={errors} />

                <AlbumTabs />
                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade active show" id="info-tab-pane" role="tabpanel" aria-labelledby="info-tab" tabIndex="0">
                                    <div className="mb-3">
                                        <label htmlFor="album_name" className="form-label fw-bold">Nome album</label>
                                        <input type="text" name="album_name" id="album_name" className="form-control w-100"
                                            value={data.album_name} placeholder="Nome album" onChange={handleInputChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label fw-bold">Descrizione</label>
                                        <textarea name="description" id="description" className="form-control w-100" placeholder="Descrizione" onChange={handleInputChange} value={data.description == null ? '' : data.description}>{data.description}</textarea>
                                    </div>

                                    <AlbumCategoryCombo categories={categories} selectedCategory={selectedCategory} handleCatsChange={handleCatsChange} />
                                </div>

                                <div className="tab-pane fade show" id="img-tab-pane" role="tabpanel" aria-labelledby="img-tab" tabIndex="0">
                                    <AlbumThumbUpload album={album} handleThumbChange={handleThumbChange} />
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Inserisci immagini</label>
                                        <GalleryUpload handleGalleryChange={handleGalleryChange} />
                                    </div>
                                    {album.photos.length > 0 && <AlbumGallery photos={album.photos} />}
                                </div>
                            </div>

                            <div className="mb-3">
                                <button className="btn cb-primary me-3" disabled={processing}>{processing ? 'In corso...' : 'Modifica'}</button>
                                <Link href={route('albums')} className="btn btn-secondary">Torna indietro</Link>
                            </div>
                        </form>
                    </div>
                    {
                        album.album_thumb &&
                        <div className="col-md-4 text-center">
                            <p className="mb-3">Thumbnail</p>
                            <img src={STORAGE_URL + album.album_thumb} title={album.album_name} alt={album.album_name}
                                width="300" className="img-fluid" />
                        </div>
                    }
                </div>
            </Layout>
        </>
    );
}

export default AlbumEdit;
