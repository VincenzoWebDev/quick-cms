import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const GalleryUpload = ({ handleGalleryChange }) => {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
        onDropAccepted: acceptedFiles => {
            handleGalleryChange(acceptedFiles);
        }
    });

    const thumbs = files.map(file => (
        <div className="gallery-preview-item" key={file.name}>
            <img
                src={file.preview}
                className="gallery-preview-image"
                onLoad={() => { URL.revokeObjectURL(file.preview) }}
            />
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div className="image-upload-container modern-gallery-upload">
            <div {...getRootProps({
                className: `dropzone gallery-dropzone ${isDragActive ? 'is-active' : ''}`,
            })}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p className="mb-0">Rilascia le immagini qui</p> :
                        <div>
                            <i className="fa-regular fa-images"></i>
                            <p className="mb-1">Trascina le immagini o clicca per selezionarle</p>
                            <small>Puoi caricare più file contemporaneamente</small>
                        </div>
                }
            </div>
            <aside className="gallery-preview-grid">
                {thumbs}
            </aside>
        </div>
    )
}

export default GalleryUpload;
