import React from 'react';
import { Link } from '@inertiajs/react';
import { STORAGE_URL } from '@/constants/constants';
import { ButtonDelete, ButtonEdit, ButtonShow, OrderShowDetails } from '@/components/Admin/Index';

const OrderRow = React.memo(({ order, selectedRecords, handleCheckboxChange, handleDelete }) => {
  const shippingStatus = String(order.shipping_status).toLowerCase();
  const paymentStatus = String(order.payment_status).toLowerCase();

  const shippingBadgeClass =
    shippingStatus === 'pending' || shippingStatus === 'unknown'
      ? 'is-warning'
      : shippingStatus === 'shipped'
        ? 'is-info'
        : shippingStatus === 'nothing'
          ? 'is-danger'
          : 'is-success';

  const shippingLabel =
    shippingStatus === 'pending' || shippingStatus === 'unknown'
      ? 'In attesa'
      : shippingStatus === 'shipped'
        ? 'Spedito'
        : shippingStatus === 'nothing'
          ? 'Nessuna spedizione'
          : 'Consegnato';

  const paymentBadgeClass =
    paymentStatus === 'pending'
      ? 'is-warning'
      : paymentStatus === 'failed' || paymentStatus === 'nothing'
        ? 'is-danger'
        : 'is-success';

  const paymentLabel =
    paymentStatus === 'pending'
      ? 'In attesa'
      : paymentStatus === 'failed'
        ? 'Fallito'
        : paymentStatus === 'nothing'
          ? 'Nessun pagamento'
          : 'Pagato';

  return (
    <tr key={order.id} className="align-middle">
      <th scope="row" className="col-1">
        <div className="form-check d-flex justify-content-center align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            value={order.id}
            onChange={(e) => handleCheckboxChange(e, order.id)}
            checked={selectedRecords.includes(order.id)}
          />
        </div>
      </th>
      <td scope="row" className="col-1">
        #{order.id}
      </td>
      <td scope="row" className="col-2">
        <div className="orders-customer-cell">
          <img
            src={STORAGE_URL + order.user.profile_img}
            alt={order.user.name}
            className="img-fluid rounded-circle object-fit-cover"
            style={{ width: '42px', height: '42px' }}
            loading="lazy"
          />
          <div className="orders-customer-meta">
            <strong>
              {order.user.name} {order.user.lastname}
            </strong>
            <small>{order.user.email}</small>
          </div>
        </div>
      </td>
      <td scope="row" className="col-1">
        <span className="orders-total-value">EUR {order.total}</span>
      </td>
      <td scope="row" className="col-1">
        <span className={`orders-status-badge ${shippingBadgeClass}`}>{shippingLabel}</span>
      </td>
      <td scope="row" className="col-1">
        <span className={`orders-status-badge ${paymentBadgeClass}`}>{paymentLabel}</span>
      </td>
      <td scope="row" className="col-2">
        <span className="orders-tracking-pill">{order.tracking_number || 'N/D'}</span>
      </td>
      <td scope="row" className="col-1">
        {order.shipping_method.name}
      </td>
      <td scope="row" className="col-2 text-center">
        <div className="action-buttons">
          <Link href={route('orders.edit', order.id)} className="action-icon-link">
            <ButtonEdit />
          </Link>
          <button type="button" onClick={() => OrderShowDetails(order)} className="action-icon-btn action-show">
            <ButtonShow />
          </button>
          <form onSubmit={handleDelete} className="d-inline" id={order.id}>
            <ButtonDelete />
          </form>
        </div>
      </td>
    </tr>
  );
});

export default OrderRow;
