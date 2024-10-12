import { STORAGE_URL } from "@/constants/constants";

const ProductCard = ({ product }) => {
    return (
        <>
            <div className="row p-2 border rounded mb-3 product" key={product.id}>
                <div className="col-md-3 mt-1">
                    <img className="img-fluid img-responsive rounded product-image" src={`${STORAGE_URL}${product.image_path}`} alt={product.name} />
                </div>
                <div className="col-md-6 mt-1">
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
                        <br />
                        <br />
                    </p>
                </div>
                <div className="align-items-center align-content-center col-md-3 border-start mt-1">
                    <div className="d-flex flex-row align-items-center">
                        <h4 className="me-1">€{product.price}</h4>
                    </div>
                    <h6 className="text-success">Spedizione gratis</h6>
                    <div className="d-flex flex-column mt-4">
                        <a href={route('productDetail.index', { 'slug': product.slug, 'id': product.id })} className="btn btn-primary btn-sm" type="button">Dettagli</a>
                        <button className="btn btn-outline-primary btn-sm mt-2" type="button">Aggiungi alla lista desideri</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard;
