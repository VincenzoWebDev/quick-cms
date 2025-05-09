import {
  OrderDeleteSelected,
  OrdersContentTable,
  Pagination,
  SearchAndPerPageSelector,
} from '@/components/Admin/Index';
import Layout from '@/Layouts/Admin/Layout';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useFilterHandlers } from '@/hooks/admin/useFilterHandlers';
import { toast } from 'react-toastify';

const OrdersContent = ({ orders, sortBy, sortDirection, perPage, sortSearch, flash }) => {
  //   const [message, setMessage] = useState(flash.message);
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
      toast.error(errors.q);
    }
  }, [errors]);

  const { delete: formDelete } = useForm();

  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState(sortSearch || '');
  const [currentPerPage, setCurrentPerPage] = useState(perPage);
  const [loading, setLoading] = useState(false);

  const { handleSearchChange, handlePerPageChange, handleSort, getSortIcon } = useFilterHandlers(
    'orders.index', // qui passi la rotta
    sortBy,
    sortDirection,
    currentPerPage,
    setCurrentPerPage,
    searchQuery,
    setSearchQuery,
    setLoading
  );

  const handleDeleteSelected = (e) => {
    OrderDeleteSelected({ e, formDelete, selectedRecords, setSelectedRecords, setSelectAll });
  };

  return (
    <Layout>
      <div className="d-grid gap-3 d-md-flex justify-content-md-start">
        <h2 className="">Gestione ordini</h2>
        {selectedRecords && selectedRecords.length > 0 && (
          <button className="btn btn-danger mb-3 mt-1" onClick={handleDeleteSelected}>
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
          <OrdersContentTable
            orders={orders}
            sortBy={sortBy}
            sortDirection={sortDirection}
            perPage={perPage}
            searchQuery={searchQuery}
            formDelete={formDelete}
            selectedRecords={selectedRecords}
            setSelectedRecords={setSelectedRecords}
            setSelectAll={setSelectAll}
            selectAll={selectAll}
            currentPerPage={currentPerPage}
            handleSort={handleSort}
            getSortIcon={getSortIcon}
          />
        </div>
      </div>
      <Pagination
        links={orders.links}
        sortBy={sortBy}
        sortDirection={sortDirection}
        perPage={currentPerPage}
        q={searchQuery}
        rotta={'orders.index'}
      />
    </Layout>
  );
};
export default OrdersContent;
