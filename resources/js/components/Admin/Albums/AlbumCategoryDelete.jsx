import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AlbumCategoryDelete = ({ e, formDelete, setMessage }) => {
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    const albumCategoryId = e.target.id;
    if (albumCategoryId) {
        MySwal.fire({
            title: "Sei sicuro di voler eliminare questa categoria?",
            text: "Non sarà possibile annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--bs-cobalto)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimina!",
            cancelButtonText: "Annulla",
        }).then((result) => {
            if (result.isConfirmed) {
                formDelete(route('album.categories.destroy', albumCategoryId), {
                    onSuccess: () => {
                        setMessage({ tipo: 'success', testo: `Categoria ${albumCategoryId} cancellata correttamente` });
                    },
                    onError: () => {
                        setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione della categoria ${albumCategoryId}` });
                    }
                });
            }
        })
    }
}

const AlbumCategoryDeleteSelected = ({ e, formDelete, setMessage, selectedRecords, setSelectedRecords, setSelectAll }) => {
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    if (selectedRecords.length === 0) {
        setMessage({ tipo: 'danger', testo: 'Nessuna categoria selezionata' });
        return;
    }
    if (selectedRecords.length > 0) {
        MySwal.fire({
            title: "Sei sicuro di voler eliminare queste categorie?",
            text: "Non sarà possibile annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--bs-cobalto)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimina!",
            cancelButtonText: "Annulla",
        }).then((result) => {
            if (result.isConfirmed) {
                formDelete(route('album.categories.destroy.batch', { recordIds: selectedRecords }), {
                    onSuccess: () => {
                        setSelectedRecords([]);
                        setSelectAll(false);
                        if (selectedRecords.length === 1) {
                            setMessage({ tipo: 'success', testo: `Categoria selezionata cancellata correttamente` });
                        } else {
                            setMessage({ tipo: 'success', testo: `Categorie selezionate cancellate correttamente` });
                        }
                    },
                    onError: () => {
                        setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione delle categorie` });
                    }
                });
            }
        })
    }
}

export { AlbumCategoryDelete, AlbumCategoryDeleteSelected };

