import React from "react";
import { Link } from "@inertiajs/react";
import { STORAGE_URL } from "@/constants/constants";
import { ButtonDelete, ButtonEdit, ButtonShow, OrderShowDetails } from "@/components/Admin/Index";

const OrderRow = React.memo(({ order, selectedRecords, handleCheckboxChange, handleDelete }) => {
    return (
        <tr key={order.id} className='align-middle'>
            <th scope="row" className='col-1'>
                <div className="form-check d-flex justify-content-center align-items-center">
                    <input className="form-check-input" type="checkbox" value={order.id}
                        onChange={(e) => handleCheckboxChange(e, order.id)}
                        checked={selectedRecords.includes(order.id)} />
                </div>
            </th>
            <td scope="row" className="col-1">#{order.id}</td>
            <td scope="row" className="col-2">
                <img src={STORAGE_URL + order.user.profile_img} alt={order.user.name} className="img-fluid rounded-circle object-fit-cover me-2"
                    style={{ width: '40px', height: '40px' }} loading="lazy"
                />
                {order.user.name}&nbsp;{order.user.lastname}
            </td>
            <td scope="row" className="col-1">€{order.total}</td>
            <td scope="row" className="col-1">
                {
                    order.shipping_status === 'pending' || order.shipping_status === 'UNKNOWN' ? (
                        <span className="badge bg-warning">In attesa di spedizione</span>
                    ) : order.shipping_status === 'shipped' ? (
                        <span className="badge bg-info">Spedito</span>
                    ) : order.shipping_status === 'nothing' ? (
                        <span className="badge bg-danger">Nessuna spedizione</span>
                    ) : (
                        <span className="badge bg-success">Consegnato</span>
                    )
                }
            </td>
            <td scope="row" className="col-1">
                {
                    order.payment_status === 'pending' ? (
                        <span className="badge bg-warning">In attesa di pagamento</span>
                    ) : order.payment_status === 'failed' ? (
                        <span className="badge bg-danger">Pagamento fallito</span>
                    ) : order.payment_status === 'nothing' ? (
                        <span className="badge bg-danger">Nessun pagamento</span>
                    ) : (
                        <span className="badge bg-success">Pagato</span>
                    )
                }
            </td>
            <td scope="row" className="col-2 text-center">{order.tracking_number}</td>
            <td scope="row" className="col-1">{order.shipping_method.name}</td>
            <td scope="row" className="col-2 text-center">
                <div className="action-buttons">
                    <Link href={route('orders.edit', order.id)} className="action-icon-link">
                        <ButtonEdit />
                    </Link>
                    <Link preserveScroll preserveState href="#" onClick={() => OrderShowDetails(order)} className="action-icon-link">
                        <ButtonShow />
                    </Link>
                    <form onSubmit={handleDelete} className="d-inline" id={order.id}>
                        <ButtonDelete />
                    </form>
                </div>
            </td>
        </tr>
    )
});

export default OrderRow;
