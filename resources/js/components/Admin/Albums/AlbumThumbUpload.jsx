
import ImageFileField from '@/components/Admin/Inputs/ImageFileField';

const AlbumThumbUpload = ({ handleThumbChange }) => {
    const handleChange = (e) => {
        const file = e.target.files[0];
        handleThumbChange(file);
    }

    return (
        <ImageFileField
            id="album_thumb"
            name="album_thumb"
            label="Thumbnail"
            onChange={handleChange}
            hint="Consigliato 1200x1200"
        />
    )
}

export default AlbumThumbUpload;
