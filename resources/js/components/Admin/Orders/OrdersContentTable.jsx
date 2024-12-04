import { OrderDelete, OrderRow } from "@/components/Admin/Index";
import React, { useCallback } from "react";

const OrdersContentTable = ({ orders, setMessage, formDelete, selectedRecords, setSelectedRecords, setSelectAll, selectAll, handleSort, getSortIcon }) => {

    const handleCheckboxChange = useCallback((e, orderId) => {
        if (e.target.checked) {
            setSelectedRecords(prevSelectedRecords => [...prevSelectedRecords, orderId]);
        } else {
            setSelectedRecords(prevSelectedRecords => prevSelectedRecords.filter(id => id !== orderId));
        }
    }, []);

    const handleSelectAllChange = useCallback((e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const allRecordIds = orders.data.map(order => order.id);
        if (isChecked) {
            setSelectedRecords(allRecordIds);
        } else {
            setSelectedRecords([]);
        }
    }, [orders]);

    const handleDelete = (e) => {
        OrderDelete({ e, formDelete, setMessage });
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover mb-0">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="form-check d-flex justify-content-center align-items-center">
                                <input className="form-check-input" type="checkbox" value={selectAll}
                                    onChange={handleSelectAllChange}
                                    checked={selectAll} />
                            </div>
                        </th>
                        <th scope="col">
                            <span onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>Id&nbsp;&nbsp;
                                {getSortIcon('id')}
                            </span>
                        </th>
                        <th scope="col">Cliente</th>
                        <th scope="col" onClick={() => handleSort('total')} style={{ cursor: 'pointer' }}>Totale {getSortIcon('total')}</th>
                        <th scope="col">Stato spedizione</th>
                        <th scope="col">Stato pagamento</th>
                        <th scope="col" className="text-center">Numero di spedizione</th>
                        <th scope="col">Metodo di spedizione</th>
                        <th scope="col" className="text-center">Operazioni</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.data.length > 0 ? (
                            orders.data.map(order => (
                                <OrderRow
                                    key={order.id}
                                    order={order}
                                    selectedRecords={selectedRecords}
                                    handleCheckboxChange={handleCheckboxChange}
                                    handleDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan='9' className='text-center'>Non ci sono ordini</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersContentTable;