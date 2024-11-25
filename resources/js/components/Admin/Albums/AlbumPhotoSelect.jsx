const AlbumPhotoSelect = ({ albums, album_id, handleAlbumChange }) => {
    const handleChange = (e) => {
        const albumId = e.target.value;
        handleAlbumChange(albumId);
    }
    const selectedAlbum = Object.values(albums).find(album => album.id == album_id);
    const selectedId = selectedAlbum ? selectedAlbum.id : null;

    return (
        <div className="mb-3">
            <label htmlFor="album_id">Album</label>
            <select className="form-select" aria-label="Default select example" name="album_id" id="album_id" value={selectedId} onChange={handleChange}>
                {album_id == '' ? (
                    <>
                        <option selected value="0">Inserisci album</option>
                        {Object.keys(albums).map((key) => (
                            <option key={key} value={albums[key].id}>{albums[key].album_name}</option>
                        ))}
                    </>
                ) : (
                    album_id != '' ? (
                        <>
                            {Object.keys(albums).map((key) => (
                                <option key={key} value={albums[key].id}>{albums[key].album_name}</option>
                            ))}
                        </>
                    ) : (
                        <>
                            {Object.keys(albums).map((key) => (
                                <option key={key} value={albums[key].id}>{albums[key].album_name}</option>
                            ))}
                        </>
                    )
                )}
            </select>
        </div>
    )
}

export default AlbumPhotoSelect;