import { STORAGE_URL } from "@/constants/constants";
import UserProfileContent from "./UserProfileContent";
import { PaymentStatus, ShippingStatus } from "@/components/Themes/QuickEcommerce/Index";
import { Link } from "@inertiajs/react";

const Orders = ({ orders }) => {
    return (
        <UserProfileContent>
            {orders.map(order => (
                <div key={order.id} className="card mb-3">
                    <div className="row card-body">
                        <div className="col-md-1 d-flex align-items-center">
                            {order.order_items.map(item => (
                                <Link href={route('productDetail.index', { 'slug': item.product.slug, 'id': item.product.id })} key={item.id}>
                                    <img src={STORAGE_URL + item.product.image_path} title={item.product.name} className="img-fluid" key={item.id} loading="lazy" />
                                </Link>
                            ))}
                        </div>
                        <div className="col-md-11 d-flex justify-content-between align-items-center px-5">
                            <div>
                                <h5 className="card-title">ID ordine: #{order.id}</h5>
                                <p className="card-text"><strong>Totale:</strong> {order.total}€</p>
                            </div>
                            <div>
                                <p className="card-text"><strong>Stato pagamento:</strong> <PaymentStatus PaymentStatus={order.payment_status} /></p>
                                <p className="card-text"><strong>Stato spedizione:</strong> <ShippingStatus ShippingStatus={order.shipping_status} /></p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </UserProfileContent>
    )
}
export default Orders