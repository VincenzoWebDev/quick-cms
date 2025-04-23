import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

const OrderDelete = ({ e, formDelete }) => {
  const MySwal = withReactContent(Swal);
  e.preventDefault();
  const orderId = e.target.id;
  if (orderId) {
    MySwal.fire({
      title: 'Sei sicuro di voler eliminare questo ordine?',
      text: 'Non sarà possibile annullare questa operazione!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-cobalto)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!',
      cancelButtonText: 'Annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        formDelete(route('orders.destroy', orderId), {
          onSuccess: () => {
            toast.success(`Ordine ${orderId} cancellato correttamente`);
          },
          onError: () => {
            toast.error(`Errore durante la cancellazione dell'ordine ${orderId}`);
          },
        });
      }
    });
  }
};
const OrderDeleteSelected = ({ e, formDelete, selectedRecords, setSelectedRecords, setSelectAll }) => {
  const MySwal = withReactContent(Swal);
  e.preventDefault();
  if (selectedRecords.length === 0) {
    toast.error('Nessun ordine selezionato');
    return;
  }
  if (selectedRecords.length > 0) {
    MySwal.fire({
      title: 'Sei sicuro di voler eliminare questi ordini?',
      text: 'Non sarà possibile annullare questa operazione!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-cobalto)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!',
      cancelButtonText: 'Annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        formDelete(route('orders.destroy.batch', { recordIds: selectedRecords }), {
          onSuccess: () => {
            setSelectedRecords([]);
            setSelectAll(false);
            if (selectedRecords.length === 1) {
              toast.success(`Ordine selezionato eliminato correttamente`);
            } else {
              toast.success(`Ordini selezionati eliminati correttamente`);
            }
          },
          onError: () => {
            toast.error(`Errore durante la cancellazione degli ordini`);
          },
        });
      }
    });
  }
};

export { OrderDelete, OrderDeleteSelected };
