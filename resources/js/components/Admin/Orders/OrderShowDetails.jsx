import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const OrderShowDetails = (order) => {
  const MySwal = withReactContent(Swal);

  const paymentStatusMap = {
    pending: 'In sospeso',
    paid: 'Pagato',
    failed: 'Fallito',
    nothing: 'Nessun pagamento',
  };
  const shippingtStatusMap = {
    pending: 'In sospeso',
    shipped: 'Spedito',
    nothing: 'Nessuna spedizione',
    delivered: 'Consegnato',
  };
  MySwal.fire({
    title: `<h4 class="mb-4"><strong>Ordine #${order.id}</strong></h4>`,
    html: `
          <div class="container">
            <div class="row mb-3">
              <div class="col-md-6">
                <p><strong>Stato spedizione:</strong> <span class="badge ${order.status === 'delivered' ? 'bg-success' : 'bg-warning'}">${shippingtStatusMap[order.status]}</span></p>
              </div>
              <div class="col-md-6">
                <p><strong>Stato pagamento:</strong> <span class="badge ${order.payment_status === 'paid' ? 'bg-success' : 'bg-warning'}">
                ${paymentStatusMap[order.payment_status]}</span></p>
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-md-6">
                <p><strong>Totale:</strong> <span class="text-info">€${order.total}</span></p>
              </div>
              <div class="col-md-6">
                <p><strong>Data:</strong> ${new Date(order.created_at).toLocaleString()}</p>
              </div>
            </div>
      
            <div class="row mb-3">
              <div class="col-12">
                <p><strong>Articoli ordinati:</strong></p>
                <ul class="list-group">
                  ${order.order_items.map(item => `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      ${item.product.name} - ${item.quantity} pezzo/i
                      <span class="badge bg-primary">€${item.price / item.quantity}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        `,
    customClass: {
      confirmButton: 'btn cb-primary', // Aggiunge le classi di Bootstrap al pulsante
      popup: 'border-radius-lg',
    },
    buttonsStyling: false, // Disabilita lo stile predefinito di SweetAlert2 per i pulsanti
    focusConfirm: false,
    confirmButtonText: 'Chiudi',
  })
}

export default OrderShowDetails;