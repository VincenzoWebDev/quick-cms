import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const PageDelete = ({ e, formDelete, setMessage }) => {
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    const pageId = e.target.id;
    if (pageId) {
        MySwal.fire({
            title: "Sei sicuro di voler eliminare questa pagina?",
            text: "Non sarà possibile annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--bs-cobalto)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimina!",
            cancelButtonText: "Annulla",
        }).then((result) => {
            if (result.isConfirmed) {
                formDelete(route('pages.destroy', pageId), {
                    onSuccess: () => {
                        setMessage({ tipo: 'success', testo: `Pagina ${pageId} cancellata correttamente` });
                    },
                    onError: () => {
                        setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione della pagina ${pageId}` });
                    }
                });
            }
        })
    }
}

const PageDeleteSelected = ({ e, formDelete, setMessage, selectedRecords, setSelectedRecords, setSelectAll }) => {
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    if (selectedRecords.length === 0) {
        setMessage({ tipo: 'danger', testo: 'Nessuna pagina selezionata' });
        return;
    }
    if (selectedRecords.length > 0) {
        MySwal.fire({
            title: "Sei sicuro di voler eliminare queste pagine?",
            text: "Non sarà possibile annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--bs-cobalto)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimina!",
            cancelButtonText: "Annulla",
        }).then((result) => {
            if (result.isConfirmed) {
                formDelete(route('pages.destroy.batch', { recordIds: selectedRecords }), {
                    onSuccess: () => {
                        setSelectedRecords([]);
                        setSelectAll(false);
                        if (selectedRecords.length === 1) {
                            setMessage({ tipo: 'success', testo: `Pagina selezionata cancellata correttamente` });
                        } else {
                            setMessage({ tipo: 'success', testo: `Pagine selezionate cancellate correttamente` });
                        }
                    },
                    onError: () => {
                        setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione delle pagine` });
                    }
                });
            }
        })
    }
}

export { PageDelete, PageDeleteSelected };
