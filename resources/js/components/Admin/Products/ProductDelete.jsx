import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ProductDelete = ({ e, formDelete, setMessage }) => {
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    const productId = e.target.id;
    if (productId) {
        MySwal.fire({
            title: "Sei sicuro di voler eliminare questo prodotto?",
            text: "Non sarà possibile annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--bs-cobalto)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimina!",
            cancelButtonText: "Annulla",
        }).then((result) => {
            if (result.isConfirmed) {
                formDelete(route('products.destroy', productId), {
                    onSuccess: () => {
                        setMessage({ tipo: 'success', testo: `Prodotto ${productId} cancellato correttamente` });
                    },
                    onError: () => {
                        setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione del prodotto ${productId}` });
                    }
                });
            }
        });
    }
}

const ProductDeleteSelected = ({ e, formDelete, setMessage, selectedRecords, setSelectedRecords, setSelectAll }) => {
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    if (selectedRecords.length === 0) {
        setMessage({ tipo: 'danger', testo: 'Nessun prodotto selezionato' });
        return;
    }
    if (selectedRecords.length > 0) {
        MySwal.fire({
            title: "Sei sicuro di voler eliminare questi prodotti?",
            text: "Non sarà possibile annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--bs-cobalto)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimina!",
            cancelButtonText: "Annulla",
        }).then((result) => {
            if (result.isConfirmed) {
                formDelete(route('products.destroy.batch', { recordIds: selectedRecords }), {
                    onSuccess: () => {
                        setSelectedRecords([]);
                        setSelectAll(false);
                        if (selectedRecords.length === 1) {
                            setMessage({ tipo: 'success', testo: `Prodotto selezionato cancellato correttamente` });
                        } else {
                            setMessage({ tipo: 'success', testo: `Prodotti selezionati cancellati correttamente` });
                        }
                    },
                    onError: () => {
                        setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione dei prodotti` });
                    }
                });
            }
        })
    }
}

export { ProductDelete, ProductDeleteSelected }
