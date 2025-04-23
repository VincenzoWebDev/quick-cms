import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

const UsersDelete = ({ e, formDelete }) => {
  const MySwal = withReactContent(Swal);
  e.preventDefault();
  const userId = e.target.id;
  if (userId) {
    MySwal.fire({
      title: 'Sei sicuro di voler eliminare questo utente?',
      text: 'Non sarà possibile annullare questa operazione!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-cobalto)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!',
      cancelButtonText: 'Annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        formDelete(route('users.destroy', userId));
      }
    });
  }
};

const UsersDeleteSelected = ({ e, formDelete, selectedRecords, setSelectedRecords, setSelectAll }) => {
  const MySwal = withReactContent(Swal);
  e.preventDefault();
  if (selectedRecords.length === 0) {
    toast.error('Nessun utente selezionato');
    return;
  }
  if (selectedRecords.length > 0) {
    MySwal.fire({
      title: 'Sei sicuro di voler eliminare questi utenti?',
      text: 'Non sarà possibile annullare questa operazione!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-cobalto)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!',
      cancelButtonText: 'Annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        formDelete(route('users.destroy.batch', { recordIds: selectedRecords }), {
          onSuccess: () => {
            setSelectedRecords([]);
            setSelectAll(false);
          },
        });
      }
    });
  }
};

export { UsersDelete, UsersDeleteSelected };
