import { ProductGallery } from "../Index";
import GalleryUpload from "../GalleryUpload";
import ImageFileField from '@/components/Admin/Inputs/ImageFileField';

const ImagesTab = ({ productImages, ThumbChanged, GalleryChanged }) => {
    const handleThumbChange = (e) => {
        const file = e.target.files[0];
        ThumbChanged(file);
    }

    const handleGalleryChange = (files) => {
        GalleryChanged(files);
    }

    return (
        <div className={`tab-pane fade show`} id="img-tab-pane" role="tabpanel" aria-labelledby="img-tab" tabIndex="0">
            <ImageFileField
                id="thumbnail"
                name="thumbnail"
                label="Thumbnail"
                onChange={handleThumbChange}
                hint="Consigliato 1200x1200"
            />
            <div className="mb-3">
                <label className="form-label fw-bold">Inserisci immagini</label>
                <GalleryUpload handleGalleryChange={handleGalleryChange} />
            </div>
            {productImages == null ? null :
                productImages.length > 0 && <ProductGallery productImages={productImages} />}
        </div>
    )
}

export default ImagesTab;
