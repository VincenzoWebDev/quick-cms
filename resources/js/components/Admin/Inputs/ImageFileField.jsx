import { useMemo, useState } from 'react';

const formatLabel = (files, multiple) => {
  if (!files || files.length === 0) {
    return multiple ? 'Nessun file selezionato' : 'Nessun file selezionato';
  }

  if (!multiple) {
    return files[0].name;
  }

  if (files.length === 1) {
    return files[0].name;
  }

  return `${files.length} file selezionati`;
};

const ImageFileField = ({
  id,
  name,
  label,
  accept = 'image/*',
  multiple = false,
  onChange,
  hint = 'PNG, JPG, WEBP',
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const currentLabel = useMemo(() => formatLabel(selectedFiles, multiple), [selectedFiles, multiple]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    onChange(e);
  };

  return (
    <div className="image-upload-field mb-3">
      <label htmlFor={id} className="form-label fw-bold">
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={id}
        accept={accept}
        multiple={multiple}
        className="image-upload-input"
        onChange={handleChange}
      />
      <label htmlFor={id} className="image-upload-trigger">
        <i className="fa-regular fa-image"></i>
        <span>{multiple ? 'Seleziona immagini' : 'Seleziona immagine'}</span>
      </label>
      <div className={`image-upload-meta ${selectedFiles.length > 0 ? 'has-file' : ''}`}>
        <span>{currentLabel}</span>
        <small>{hint}</small>
      </div>
    </div>
  );
};

export default ImageFileField;
