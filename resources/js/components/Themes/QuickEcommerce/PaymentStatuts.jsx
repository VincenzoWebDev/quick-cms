const PaymentStatus = ({ PaymentStatus }) => {
    if (PaymentStatus === 'paid') {
        return <span className="badge bg-success">Pagato</span>
    } else if (PaymentStatus === 'failed') {
        return <span className="badge bg-danger">Fallito</span>
    } else if (PaymentStatus === 'nothing') {
        return <span className="badge bg-info">Nessuno</span>
    } else if (PaymentStatus === 'pending') {
        return <span className="badge bg-warning">In attesa</span>
    }
}
export default PaymentStatus