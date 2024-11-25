import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '5px'
};

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
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div className="image-upload-container">
            <div {...getRootProps({
                className: 'dropzone',
                style: {
                    border: '2px dashed #ccc',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                },
            })}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Rilascia i file qui</p> :
                        <p>Trascina e rilascia i file qui, o clicca per selezionare i file</p>
                }
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </div>
    )
}

export default GalleryUpload;
