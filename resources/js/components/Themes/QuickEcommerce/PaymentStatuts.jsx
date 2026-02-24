const PaymentStatus = ({ paymentStatus, PaymentStatus }) => {
    const status = paymentStatus ?? PaymentStatus;
    if (status === 'paid') {
        return <span className="badge bg-success">Pagato</span>
    } else if (status === 'failed') {
        return <span className="badge bg-danger">Fallito</span>
    } else if (status === 'nothing') {
        return <span className="badge bg-info">Nessuno</span>
    } else if (status === 'pending') {
        return <span className="badge bg-warning">In attesa</span>
    }
}
export default PaymentStatus
