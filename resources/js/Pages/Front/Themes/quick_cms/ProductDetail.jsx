import FrontLayout from "@/Layouts/FrontLayout"
import Fancybox from "@/components/Front/Fancybox";
import { ProductDetailCard } from "@/components/Front/Index";
import { STORAGE_URL } from "@/constants/constants";
import { Link } from "@inertiajs/react";

const ProductDetail = ({ product, variantNames, pages }) => {

    return (
        <FrontLayout pages={pages}>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12 mb-4">
                        <Link href={route('productList')}>Torna indietro</Link>
                    </div>
                    <div className="col-md-6">
                        <Fancybox
                            options={{
                                Carousel: { infinite: true },
                                transition: "slide",
                            }}>
                            <div className="d-flex">
                                {/* Thumbnail a sinistra */}
                                <div className="thumbnails d-flex flex-column justify-content-center me-4">
                                    {product.product_images.map((product_image) => (
                                        <a key={product_image.id} data-fancybox="gallery" href={STORAGE_URL + product_image.image_path} className="mb-2">
                                            <img
                                                src={STORAGE_URL + product_image.image_path}
                                                alt={`Thumbnail ${product_image.id}`}
                                                className="img-thumbnail"
                                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                            />
                                        </a>
                                    ))}
                                </div>
                                {/* Immagine principale */}
                                <div className="main-image">
                                    <a data-fancybox="gallery" href={STORAGE_URL + product.image_path}>
                                        <img
                                            src={STORAGE_URL + product.image_path}
                                            alt={`Immagine ${product.name}`}
                                            title={`Immagine ${product.name}`}
                                            className="img-fluid"
                                            style={{ maxHeight: '500px', objectFit: 'contain' }}
                                        />
                                    </a>
                                </div>
                            </div>
                        </Fancybox>
                    </div>
                    <ProductDetailCard product={product} variantNames={variantNames} />
                </div>
            </div>
        </FrontLayout>
    )
}

export default ProductDetail