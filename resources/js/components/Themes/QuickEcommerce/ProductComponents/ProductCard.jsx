import { STORAGE_URL } from "@/constants/constants";
import { Link } from "@inertiajs/react";
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <>
            <div className="col mb-3">
                <div className="card h-100 bg">
                    <img className="img-fluid img-responsive rounded product-image" src={`${STORAGE_URL}${product.image_path}`} alt={product.name} loading="lazy" />
                    <div className="card-body">
                        <h5 className="text-red-500">{product.name}</h5>
                        <div className="d-flex flex-row">
                            <div className="ratings me-2">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                        </div>
                        <p className="text-justify text-truncate description mb-0">
                            {product.description}
                        </p>
                        <div className="align-items-center align-content-center">
                            <div className="d-flex flex-row align-items-center">
                                <h5 className="me-1">€{product.price}</h5>
                            </div>
                            <h6 className="text-success">Spedizione gratis</h6>
                            <div className="d-flex flex-row align-items-center justify-content-center mt-3 gap-2">
                                <Link href={route('productDetail.index', { 'slug': product.slug, 'id': product.id })} className="btn btn-primary btn-sm" type="button">Dettagli</Link>
                                <button className="btn btn-danger btn-sm" type="button"><Heart size={20} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ProductCard;
