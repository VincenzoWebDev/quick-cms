
import ImageFileField from '@/components/Admin/Inputs/ImageFileField';

const PhotoFileUpload = ({ handleFileChange }) => {
    const handleChange = (e) => {
        if (e.target.files.length == 1) {
            const file = e.target.files[0];
            handleFileChange(file);
        } else if (e.target.files.length > 1) {
            const files = Array.from(e.target.files);
            handleFileChange(files);
        } else {
            handleFileChange(null);
        }
    }

    return (
        <ImageFileField
            id="img_path"
            name="img_path"
            label="Immagini"
            onChange={handleChange}
            multiple
            hint="Puoi selezionare uno o più file"
        />
    )
}

export default PhotoFileUpload;
