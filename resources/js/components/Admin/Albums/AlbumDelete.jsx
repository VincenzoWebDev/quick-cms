import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AlbumDelete = ({ e, formDelete, setMessage }) => {
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    const albumId = e.target.id;
    if (albumId) {
        MySwal.fire({
            title: "Sei sicuro di voler eliminare questo album?",
            text: "Non sarà possibile annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--bs-cobalto)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimina!",
            cancelButtonText: "Annulla",
        }).then((result) => {
            if (result.isConfirmed) {
                formDelete(route('albums.destroy', albumId), {
                    onSuccess: () => {
                        setMessage({ tipo: 'success', testo: `Album ${albumId} cancellato correttamente` });
                    },
                    onError: () => {
                        setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione dell'album ${albumId}` });
                    }
                });
            }
        });
    }
}

const AlbumDeleteSelected = ({ e, formDelete, setMessage, selectedRecords, setSelectedRecords, setSelectAll }) => {
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    if (selectedRecords.length === 0) {
        setMessage({ tipo: 'danger', testo: 'Nessun album selezionato' });
        return;
    }
    if (selectedRecords.length > 0) {
        MySwal.fire({
            title: "Sei sicuro di voler eliminare questi albums?",
            text: "Non sarà possibile annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--bs-cobalto)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimina!",
            cancelButtonText: "Annulla",
        }).then((result) => {
            if (result.isConfirmed) {
                formDelete(route('albums.destroy.batch', { recordIds: selectedRecords }), {
                    onSuccess: () => {
                        setSelectedRecords([]);
                        setSelectAll(false);
                        if (selectedRecords.length === 1) {
                            setMessage({ tipo: 'success', testo: `Album selezionato eliminato correttamente` });
                        } else {
                            setMessage({ tipo: 'success', testo: `Albums selezionati eliminati correttamente` });
                        }
                    },
                    onError: () => {
                        setMessage({ tipo: 'danger', testo: `Errore durante l'eliminazione' degli albums` });
                    }
                });
            }
        })
    }
}

export { AlbumDelete, AlbumDeleteSelected };