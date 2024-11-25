const ShippingStatus = ({ ShippingStatus }) => {
    if (ShippingStatus === 'delivered') {
        return <span className="badge bg-success">Consegnato</span>
    } else if (ShippingStatus === 'pending') {
        return <span className="badge bg-warning">In attesa</span>
    } else if (ShippingStatus === 'nothing') {
        return <span className="badge bg-danger">Nessuna</span>
    } else if (ShippingStatus === 'shipped') {
        return <span className="badge bg-info">In consegna</span>
    } else {
        return <span className="badge bg-warning">In attesa</span>
    }
}
export default ShippingStatus