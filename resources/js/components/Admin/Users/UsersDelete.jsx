import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const UsersDelete = ({ e, formDelete, setMessage }) => {
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    const userId = e.target.id;
    if (userId) {
        MySwal.fire({
            title: "Sei sicuro di voler eliminare questo utente?",
            text: "Non sarà possibile annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--bs-cobalto)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimina!",
            cancelButtonText: "Annulla",
        }).then((result) => {
            if (result.isConfirmed) {
                formDelete(route('users.destroy', userId), {
                    onSuccess: () => {
                        setMessage({ tipo: 'success', testo: `Utente ${userId} cancellato correttamente` });
                    },
                    onError: () => {
                        setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione dell'utente ${userId}` });
                    }
                });
            }
        });
    }
}

const UsersDeleteSelected = ({ e, formDelete, setMessage, selectedRecords, setSelectedRecords, setSelectAll }) => {
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    if (selectedRecords.length === 0) {
        setMessage({ tipo: 'danger', testo: 'Nessun utente selezionato' });
        return;
    }
    if (selectedRecords.length > 0) {
        MySwal.fire({
            title: "Sei sicuro di voler eliminare questi utenti?",
            text: "Non sarà possibile annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--bs-cobalto)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimina!",
            cancelButtonText: "Annulla",
        }).then((result) => {
            if (result.isConfirmed) {
                formDelete(route('users.destroy.batch', { recordIds: selectedRecords }), {
                    onSuccess: () => {
                        setSelectedRecords([]);
                        setSelectAll(false);
                        if (selectedRecords.length === 1) {
                            setMessage({ tipo: 'success', testo: `Utente selezionato cancellato correttamente` });
                        } else {
                            setMessage({ tipo: 'success', testo: `Utenti selezionati cancellati correttamente` });
                        }
                    },
                    onError: () => {
                        setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione degli utenti` });
                    }
                });
            }
        })
    }
}

export { UsersDelete, UsersDeleteSelected };