import { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Admin/Layout';
import {
  ButtonDelete,
  ButtonEdit,
  Pagination,
  AlbumDelete,
  AlbumDeleteSelected,
  SectionHeader,
} from '@/components/Admin/Index';
import { STORAGE_URL } from '@/constants/constants';
import { toast } from 'react-toastify';

const AlbumsContent = ({ albums, flash }) => {
  const { delete: formDelete } = useForm();
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (flash?.message) {
      if (flash.message.tipo === 'success') {
        toast.success(flash.message.testo);
      } else if (flash.message.tipo === 'danger') {
        toast.error(flash.message.testo);
      }
    }
  }, [flash]);

  const handleCheckboxChange = (e, albumId) => {
    if (e.target.checked) {
      setSelectedRecords((prevSelectedRecords) => [...prevSelectedRecords, albumId]);
    } else {
      setSelectedRecords((prevSelectedRecords) => prevSelectedRecords.filter((id) => id !== albumId));
    }
  };

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    const allRecordIds = albums.data.map((album) => album.id);
    if (isChecked) {
      setSelectedRecords(allRecordIds);
    } else {
      setSelectedRecords([]);
    }
  };

  const handleDelete = (e) => {
    AlbumDelete({ e, formDelete });
  };

  const handleDeleteSelected = (e) => {
    AlbumDeleteSelected({ e, formDelete, selectedRecords, setSelectedRecords, setSelectAll });
  };

  return (
    <Layout>
      <SectionHeader
        title="Gestione album"
        subtitle="Organizza raccolte, categorie e copertine della tua galleria."
        primaryAction={
          <Link href={route('albums.create')} className="btn cb-primary">
            Inserisci nuovo album
          </Link>
        }
        showBulkAction={selectedRecords.length > 0}
        bulkCount={selectedRecords.length}
        onBulkAction={handleDeleteSelected}
      />

      <div className="card shadow-2-strong">
        <div className="card-body">
          <div className="table-responsive admin-table-shell">
            <table className="table table-hover mb-0 admin-table">
              <thead>
                <tr>
                  <th scope="col">
                    <div className="form-check d-flex justify-content-center align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={selectAll}
                        onChange={handleSelectAllChange}
                        checked={selectAll}
                      />
                    </div>
                  </th>
                  <th scope="col">Id</th>
                  <th scope="col">Nome album</th>
                  <th scope="col">Autore</th>
                  <th scope="col">Categorie</th>
                  <th scope="col">Thumbnail</th>
                  <th scope="col" className="text-center">
                    Operazioni
                  </th>
                </tr>
              </thead>
              <tbody>
                {albums.data.length > 0 ? (
                  albums.data.map((album) => (
                    <tr key={album.id} className="align-middle">
                      <th scope="row" className="col-md-1">
                        <div className="form-check d-flex justify-content-center align-items-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={album.id}
                            onChange={(e) => handleCheckboxChange(e, album.id)}
                            checked={selectedRecords.includes(album.id)}
                          />
                        </div>
                      </th>
                      <th scope="row" className="col-md-1">
                        {album.id}
                      </th>
                      <td scope="row" className="col-md-2">
                        {album.album_name}
                      </td>
                      <td scope="row" className="col-md-2">
                        {album.user.name}
                      </td>
                      <td scope="row" className="col-md-2">
                        {album.categories.length > 0 ? (
                          album.categories.map((cat) => <li key={cat.id}>{cat.category_name}</li>)
                        ) : (
                          <span>Nessuna categoria</span>
                        )}
                      </td>
                      <td scope="row" className="col-md-2">
                        <img src={STORAGE_URL + album.album_thumb} width="120" alt={album.album_name} loading="lazy" />
                      </td>
                      <td scope="row" className="text-center col-md-2">
                        <div className="action-buttons justify-content-center">
                          <Link href={route('albums.edit', album.id)} className="action-icon-link">
                            <ButtonEdit />
                          </Link>
                          <form onSubmit={handleDelete} className="d-inline" id={album.id}>
                            <ButtonDelete />
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Non ci sono album
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination links={albums.links} />
    </Layout>
  );
};

export default AlbumsContent;
