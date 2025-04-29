import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

const AlbumDelete = ({ e, formDelete }) => {
  const MySwal = withReactContent(Swal);
  e.preventDefault();
  const albumId = e.target.id;
  if (albumId) {
    MySwal.fire({
      title: 'Sei sicuro di voler eliminare questo album?',
      text: 'Non sarà possibile annullare questa operazione!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-cobalto)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!',
      cancelButtonText: 'Annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        formDelete(route('albums.destroy', albumId));
      }
    });
  }
};

const AlbumDeleteSelected = ({ e, formDelete, selectedRecords, setSelectedRecords, setSelectAll }) => {
  const MySwal = withReactContent(Swal);
  e.preventDefault();
  if (selectedRecords.length === 0) {
    toast.error('Nessun album selezionato');
    return;
  }
  if (selectedRecords.length > 0) {
    MySwal.fire({
      title: 'Sei sicuro di voler eliminare questi albums?',
      text: 'Non sarà possibile annullare questa operazione!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-cobalto)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!',
      cancelButtonText: 'Annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        formDelete(route('albums.destroy.batch', { recordIds: selectedRecords }), {
          onSuccess: () => {
            setSelectedRecords([]);
            setSelectAll(false);
          },
        });
      }
    });
  }
};

export { AlbumDelete, AlbumDeleteSelected };
