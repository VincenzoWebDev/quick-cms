import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const OrderShowDetails = (order) => {
  const MySwal = withReactContent(Swal);
  const escapeHtml = (value) =>
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const paymentStatusMap = {
    pending: 'In sospeso',
    paid: 'Pagato',
    failed: 'Fallito',
    nothing: 'Nessun pagamento',
  };
  const shippingStatusMap = {
    pending: 'In sospeso',
    shipped: 'Spedito',
    nothing: 'Nessuna spedizione',
    delivered: 'Consegnato',
  };
  const shippingStatus = String(order.shipping_status || '').toLowerCase();
  const paymentStatus = String(order.payment_status || '').toLowerCase();
  const currencyFormatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });
  const dateLabel = order.created_at
    ? new Date(order.created_at).toLocaleString('it-IT')
    : 'N/D';
  const shippingTone = shippingStatus === 'delivered'
    ? 'success'
    : shippingStatus === 'shipped'
      ? 'info'
      : shippingStatus === 'pending'
        ? 'warning'
        : 'muted';
  const paymentTone = paymentStatus === 'paid'
    ? 'success'
    : paymentStatus === 'failed'
      ? 'danger'
      : paymentStatus === 'pending'
        ? 'warning'
        : 'muted';
  const trackingLabel = order.tracking_number || 'N/D';
  const shippingMethodLabel = order.shipping_method?.name || 'N/D';
  MySwal.fire({
    title: `Ordine #${order.id}`,
    html: `
          <div class="order-details">
            <div class="order-details__status">
              <div class="order-status-card">
                <span class="order-status-card__label">Spedizione</span>
                <span class="order-status-card__value is-${shippingTone}">${shippingStatusMap[shippingStatus] ?? 'N/D'}</span>
              </div>
              <div class="order-status-card">
                <span class="order-status-card__label">Pagamento</span>
                <span class="order-status-card__value is-${paymentTone}">${paymentStatusMap[paymentStatus] ?? 'N/D'}</span>
              </div>
            </div>

            <div class="order-details__grid">
              <div class="order-info">
                <span>Totale</span>
                <strong>${currencyFormatter.format(Number(order.total) || 0)}</strong>
              </div>
              <div class="order-info">
                <span>Data</span>
                <strong>${dateLabel}</strong>
              </div>
              <div class="order-info">
                <span>Metodo</span>
                <strong>${escapeHtml(shippingMethodLabel)}</strong>
              </div>
              <div class="order-info">
                <span>Tracking</span>
                <strong>${escapeHtml(trackingLabel)}</strong>
              </div>
            </div>

            <div class="order-items">
              <div class="order-items__header">Articoli ordinati</div>
              <div class="order-items__list">
                ${order.order_items.map(item => {
                  const itemPrice = Number(item.price) / (Number(item.quantity) || 1);
                  return `
                    <div class="order-item-row">
                      <div>
                        <div class="order-item-row__name">${escapeHtml(item.product.name)}</div>
                        <div class="order-item-row__meta">${item.quantity} pezzo/i</div>
                      </div>
                      <div class="order-item-row__price">${currencyFormatter.format(itemPrice || 0)}</div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        `,
    customClass: {
      confirmButton: 'btn cb-primary order-details-confirm',
      popup: 'order-details-modal',
      title: 'order-details-title',
      htmlContainer: 'order-details-body',
    },
    buttonsStyling: false, // Disabilita lo stile predefinito di SweetAlert2 per i pulsanti
    focusConfirm: false,
    confirmButtonText: 'Chiudi',
    showCloseButton: true,
  })
}

export default OrderShowDetails;
