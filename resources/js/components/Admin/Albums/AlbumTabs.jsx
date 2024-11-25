const AlbumTabs = () => {
    return (
        <>
            <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="info-tab" data-bs-toggle="tab" data-bs-target="#info-tab-pane"
                        type="button" role="tab" aria-controls="info-tab-pane" aria-selected={true}>
                        Informazioni
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="img-tab" data-bs-toggle="tab" data-bs-target="#img-tab-pane"
                        type="button" role="tab" aria-controls="img-tab-pane" aria-selected={true}>
                        Immagini
                    </button>
                </li>
            </ul>
        </>
    )
}

export default AlbumTabs;
