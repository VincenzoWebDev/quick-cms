import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ProductDelete = ({ productId, formDelete }) => {
    const MySwal = withReactContent(Swal);
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
                formDelete(route("products.destroy", productId), {
                    onSuccess: () => {
                        toast.success(
                            `Prodotto ${productId} cancellato correttamente`
                        );
                    },
                    onError: () => {
                        toast.error(
                            `Errore durante la cancellazione del prodotto ${productId}`
                        );
                    },
                });
            }
        });
    }
};

const ProductDeleteSelected = ({
    formDelete,
    selectedRecords,
    setSelectedRecords,
    setSelectAll,
}) => {
    const MySwal = withReactContent(Swal);
    if (selectedRecords.length === 0) {
        toast.error("Nessun prodotto selezionato");
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
                formDelete(
                    route("products.destroy.batch", {
                        recordIds: selectedRecords,
                    }),
                    {
                        onSuccess: () => {
                            setSelectedRecords([]);
                            setSelectAll(false);
                            if (selectedRecords.length === 1) {
                                toast.success(
                                    `Prodotto selezionato cancellato correttamente`
                                );
                            } else {
                                toast.success(
                                    `Prodotti selezionati cancellati correttamente`
                                );
                            }
                        },
                        onError: () => {
                            toast.error(
                                `Errore durante la cancellazione dei prodotti`
                            );
                        },
                    }
                );
            }
        });
    }
};

export { ProductDelete, ProductDeleteSelected };
