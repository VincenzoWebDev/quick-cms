import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@/Layouts/Admin/Layout';
import {
  UsersDelete,
  UsersDeleteSelected,
  Pagination,
  SearchAndPerPageSelector,
  UserRow,
} from '@/components/Admin/Index';
import { useFilterHandlers } from '@/hooks/admin/useFilterHandlers';
import { toast } from 'react-toastify';

const UsersContent = ({ users, sortBy, sortDirection, perPage, sortSearch, flash }) => {
  const { delete: formDelete } = useForm();

  useEffect(() => {
    if (flash?.message) {
      if (flash.message.tipo === 'success') {
        toast.success(flash.message.testo);
      } else if (flash.message.tipo === 'danger') {
        toast.error(flash.message.testo);
      }
    }
  }, [flash]);

  const { errors } = usePage().props;
  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      toast.error(errors.q || errors.perPage || errors.sortBy || errors.sortDirection || errors.page);
    }
  }, [errors]);

  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState(sortSearch || '');
  const [currentPerPage, setCurrentPerPage] = useState(perPage);
  const [loading, setLoading] = useState(false);

  const { handleSearchChange, handlePerPageChange, handleSort, getSortIcon } = useFilterHandlers(
    'users.index', // qui passi solo il nome della rotta senza route()
    sortBy,
    sortDirection,
    currentPerPage,
    setCurrentPerPage,
    searchQuery,
    setSearchQuery,
    setLoading
  );

  const handleCheckboxChange = useCallback((e, userId) => {
    if (e.target.checked) {
      setSelectedRecords((prevSelectedRecords) => [...prevSelectedRecords, userId]);
    } else {
      setSelectedRecords((prevSelectedRecords) => prevSelectedRecords.filter((id) => id !== userId));
    }
  }, []);

  const handleSelectAllChange = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      setSelectAll(isChecked);
      const allRecordIds = users.data.map((user) => user.id);
      if (isChecked) {
        setSelectedRecords(allRecordIds);
      } else {
        setSelectedRecords([]);
      }
    },
    [users]
  );

  const handleDelete = (e) => {
    UsersDelete({ e, formDelete });
  };

  const handleDeleteSelected = (e) => {
    UsersDeleteSelected({ e, formDelete, selectedRecords, setSelectedRecords, setSelectAll });
  };

  return (
    <Layout>
      <h2>Lista users</h2>

      <div className="d-grid gap-2 d-md-flex justify-content-md-start">
        <Link href={route('users.create')} className="btn cb-primary mb-3">
          Inserisci nuovo utente
        </Link>
        {selectedRecords && selectedRecords.length > 0 && (
          <button className="btn btn-danger mb-3" onClick={handleDeleteSelected}>
            Elimina selezionati
          </button>
        )}
      </div>

      <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="card-body">
          <SearchAndPerPageSelector
            currentPerPage={currentPerPage}
            handlePerPageChange={handlePerPageChange}
            loading={loading}
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
          />

          <div className="table-responsive">
            <table className="table table-hover mb-0">
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
                  <th scope="col" onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                    Id {getSortIcon('id')}
                  </th>
                  <th scope="col">Avatar</th>
                  <th scope="col" onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                    Name {getSortIcon('name')}
                  </th>
                  <th scope="col" onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                    Email {getSortIcon('email')}
                  </th>
                  <th scope="col" onClick={() => handleSort('role')} style={{ cursor: 'pointer' }}>
                    Ruolo {getSortIcon('role')}
                  </th>
                  <th scope="col" onClick={() => handleSort('created_at')} style={{ cursor: 'pointer' }}>
                    Creato il {getSortIcon('created_at')}
                  </th>
                  <th scope="col">Aggiornato il</th>
                  <th scope="col" className="text-center">
                    Operazioni
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.data.length > 0 ? (
                  users.data.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      selectedRecords={selectedRecords}
                      handleCheckboxChange={handleCheckboxChange}
                      handleDelete={handleDelete}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      Nessun utente trovato
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        links={users.links}
        sortBy={sortBy}
        sortDirection={sortDirection}
        perPage={currentPerPage}
        q={searchQuery}
        rotta={'users.index'}
      />
    </Layout>
  );
};

export default UsersContent;
