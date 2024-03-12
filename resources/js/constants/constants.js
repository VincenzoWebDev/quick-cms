const { VITE_APP_ENV, VITE_BASE_URL, VITE_STORAGE_URL } = import.meta.env;

let baseUrl;
let storageUrl;
if (VITE_APP_ENV === 'production') {
    baseUrl = VITE_BASE_URL;
    storageUrl = VITE_STORAGE_URL;
} else if (VITE_APP_ENV === 'local') {
    baseUrl = 'http://localhost/quick-cms/public/';
    storageUrl = 'http://localhost/quick-cms/public/storage/';
} else {
    // Gestisci altri ambienti se necessario
    baseUrl = ''; // Default per altri ambienti
    storageUrl = '';
}

export const BASE_URL = baseUrl;
export const STORAGE_URL = storageUrl;

/* Editor config */
export const EDITOR_CONFIG = {
    height: 300,
    menubar: false,
    direction: 'ltr',
    menubar: 'file edit view insert format tools table help',
    plugins: [
        'code',
    ],
    toolbar: 'undo redo | styles | formatselect | ' +
        'bold italic backcolor forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help | code | h1 h2 h3 h4 h5 h6',
    content_style: 'body { font-family:Roboto, sans-serif; font-size:14px }'
};
export const API_KEY_EDITOR = 'q2q8szpna6www4mstibaoriqw2mrsaeqivcmkec6fp3i2prq';
/* End Editor config */