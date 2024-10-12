
const AlbumFileUpload = ({ handleFileChange }) => {
    const handleChange = (e) => {
        const file = e.target.files[0];
        handleFileChange(file);
    }

    return (
        <>
            <div className="mb-3">
                <label htmlFor="album_thumb">Thumbnail</label>
                <input type="file" name="album_thumb" id="album_thumb" className="form-control" onChange={handleChange} />
            </div>
        </>
    )
}

export default AlbumFileUpload;