import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

const AlbumCategoryDelete = ({ e, formDelete }) => {
  const MySwal = withReactContent(Swal);
  e.preventDefault();
  const albumCategoryId = e.target.id;
  if (albumCategoryId) {
    MySwal.fire({
      title: 'Sei sicuro di voler eliminare questa categoria?',
      text: 'Non sarà possibile annullare questa operazione!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-cobalto)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!',
      cancelButtonText: 'Annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        formDelete(route('album.categories.destroy', albumCategoryId));
      }
    });
  }
};

const AlbumCategoryDeleteSelected = ({ e, formDelete, selectedRecords, setSelectedRecords, setSelectAll }) => {
  const MySwal = withReactContent(Swal);
  e.preventDefault();
  if (selectedRecords.length === 0) {
    toast.error('Nessuna categoria selezionata');
    return;
  }
  if (selectedRecords.length > 0) {
    MySwal.fire({
      title: 'Sei sicuro di voler eliminare queste categorie?',
      text: 'Non sarà possibile annullare questa operazione!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-cobalto)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!',
      cancelButtonText: 'Annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        formDelete(route('album.categories.destroy.batch', { recordIds: selectedRecords }), {
          onSuccess: () => {
            setSelectedRecords([]);
            setSelectAll(false);
          },
        });
      }
    });
  }
};

export { AlbumCategoryDelete, AlbumCategoryDeleteSelected };
