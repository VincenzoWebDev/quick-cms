import { router } from '@inertiajs/react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const CombinationsDelete = ({ combinationId }) => {
    router.delete(route('products.destroy.combination', combinationId));
}

const CombinationsDeleteSelected = ({ e, setMessage, selectedRecords, setSelectedRecords, setSelectAll }) => {
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    if (selectedRecords.length === 0) {
        return;
    }
    if (selectedRecords.length > 0) {
        MySwal.fire({
            title: "Sei sicuro di voler eliminare queste combinazioni?",
            text: "Non sarà possibile annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--bs-cobalto)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimina!",
            cancelButtonText: "Annulla",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('products.destroy.combination.batch', { recordIds: selectedRecords }
                ), {
                    onSuccess: () => {
                        setSelectedRecords([]);
                        setSelectAll(false);
                        if (selectedRecords.length === 1) {
                            setMessage({ tipo: 'success', testo: "Combinazione selezionata cancellata correttamente" });
                        } else {
                            setMessage({ tipo: 'success', testo: "Combinazioni selezionate cancellate correttamente" });
                        }
                    },
                    onError: () => {
                        setMessage({ tipo: 'danger', testo: "Errore durante la cancellazione delle combinazioni" });
                    }
                })
            }
        })
    }
}

export { CombinationsDelete, CombinationsDeleteSelected }