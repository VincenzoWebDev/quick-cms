
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
        <>
            <div className="mb-3">
                <label htmlFor="img_path">Immagine</label>
                <input type="file" name="img_path" id="img_path" className="form-control w-50" onChange={handleChange} multiple />
            </div>
        </>
    )
}

export default PhotoFileUpload;