const ShippingStatus = ({ shippingStatus, ShippingStatus }) => {
    const status = shippingStatus ?? ShippingStatus;
    if (status === 'delivered') {
        return <span className="badge bg-success">Consegnato</span>
    } else if (status === 'pending') {
        return <span className="badge bg-warning">In attesa</span>
    } else if (status === 'nothing') {
        return <span className="badge bg-danger">Nessuna</span>
    } else if (status === 'shipped') {
        return <span className="badge bg-info">In consegna</span>
    } else {
        return <span className="badge bg-warning">In attesa</span>
    }
}
export default ShippingStatus
