import React, { useEffect } from 'react';
import { STORAGE_URL } from '@/constants/constants';
import { Link } from '@inertiajs/react';

const BestSellingProducts = ({ products }) => {

    return (
        <section className="pb-5">
            <div className="container-lg">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex flex-wrap justify-content-between my-4">
                            <h2 className="section-title">Best selling products</h2>
                            <div className="d-flex align-items-center">
                                <Link href={route('productList')} className="btn btn-primary rounded-1">Vedi tutti</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
                            {products.map((product, index) => (
                                <div className="col" key={product.id} data-aos="fade-up" data-aos-delay={index * 100}>
                                    <div className="product-item">
                                        <figure>
                                            <Link href={route('productDetail.index', { 'slug': product.slug, 'id': product.id })} title={product.name}>
                                                <img src={STORAGE_URL + product.image_path} alt="Product Thumbnail" className="tab-image img-fluid" loading='lazy' />
                                            </Link>
                                        </figure>
                                        <div className='justify-content-center d-flex'>
                                            <h5>{product.name}</h5>
                                        </div>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">{product.title}</h3>
                                            <div>
                                                <span className="rating">
                                                    {[...Array(5)].map((_, index) => (
                                                        <svg
                                                            key={index}
                                                            width="18"
                                                            height="18"
                                                            className={`text-warning ${index < Math.floor(product.rating) ? 'filled' : ''}`}
                                                        >
                                                            <use xlinkHref={index < Math.floor(product.rating) ? "#star-full" : "#star-half"} />
                                                        </svg>
                                                    ))}
                                                </span>
                                                <span>({product.reviews})</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <span>${product.price}</span>
                                                {/* <span className="text-dark fw-semibold">${product.discountedPrice.toFixed(2)}</span> */}
                                                {/* <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                                                    {product.discountPercentage}% OFF
                                                </span> */}
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3">
                                                        <input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" />
                                                    </div>
                                                    <div className="col-7">
                                                        <a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                                                            <svg width="18" height="18"><use xlinkHref="#cart" /></svg> Aggiungi
                                                        </a>
                                                    </div>
                                                    <div className="col-2">
                                                        <a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6">
                                                            <svg width="18" height="18"><use xlinkHref="#heart" /></svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* / product-grid */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BestSellingProducts;
