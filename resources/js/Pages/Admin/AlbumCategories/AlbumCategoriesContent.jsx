import { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Admin/Layout';
import {
  ButtonDelete,
  ButtonEdit,
  Pagination,
  AlbumCategoryDelete,
  AlbumCategoryDeleteSelected,
  SectionHeader,
} from '@/components/Admin/Index';
import { toast } from 'react-toastify';

const AlbumCategoriesContent = ({ albumCategories, flash }) => {
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

  const handleCheckboxChange = (e, catId) => {
    if (e.target.checked) {
      setSelectedRecords((prevSelectedRecords) => [...prevSelectedRecords, catId]);
    } else {
      setSelectedRecords((prevSelectedRecords) => prevSelectedRecords.filter((id) => id !== catId));
    }
  };

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    const allRecordIds = albumCategories.data.map((cat) => cat.id);
    if (isChecked) {
      setSelectedRecords(allRecordIds);
    } else {
      setSelectedRecords([]);
    }
  };

  const handleDelete = (e) => {
    AlbumCategoryDelete({ e, formDelete });
  };

  const handleDeleteSelected = (e) => {
    AlbumCategoryDeleteSelected({ e, formDelete, selectedRecords, setSelectedRecords, setSelectAll });
  };

  return (
    <Layout>
      <SectionHeader
        title="Categorie album"
        subtitle="Definisci e gestisci le categorie usate nelle raccolte fotografiche."
        primaryAction={
          <Link href={route('album.categories.create')} className="btn cb-primary">
            Inserisci nuova categoria
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
                  <th scope="col">Nome categoria</th>
                  <th scope="col">Data creazione</th>
                  <th scope="col">Data aggiornamento</th>
                  <th scope="col">Numeri di album</th>
                  <th scope="col" className="text-center">
                    Operazioni
                  </th>
                </tr>
              </thead>
              <tbody>
                {albumCategories.data.length > 0 ? (
                  albumCategories.data.map((cat) => (
                    <tr key={cat.id} className="align-middle">
                      <th scope="row" className="col-md-1">
                        <div className="form-check d-flex justify-content-center align-items-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={cat.id}
                            onChange={(e) => handleCheckboxChange(e, cat.id)}
                            checked={selectedRecords.includes(cat.id)}
                          />
                        </div>
                      </th>
                      <th scope="row" className="col-md-1">
                        {cat.id}
                      </th>
                      <td scope="row" className="col-md-2">
                        {cat.category_name}
                      </td>
                      <td scope="row" className="col-md-2">
                        {new Date(cat.created_at).toLocaleDateString()}
                      </td>
                      <td scope="row" className="col-md-2">
                        {new Date(cat.updated_at).toLocaleDateString()}
                      </td>
                      <td scope="row" className="col-md-1">
                        {cat.albums_count}
                      </td>
                      <td scope="row" className="text-center col-md-2">
                        <div className="action-buttons justify-content-center">
                          <Link href={route('album.categories.edit', cat.id)} className="action-icon-link">
                            <ButtonEdit />
                          </Link>
                          <form onSubmit={handleDelete} method="post" className="d-inline" id={cat.id}>
                            <ButtonDelete />
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Non ci sono categorie
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination links={albumCategories.links} />
    </Layout>
  );
};

export default AlbumCategoriesContent;
