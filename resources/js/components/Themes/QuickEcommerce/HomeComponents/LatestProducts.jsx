import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { STORAGE_URL } from '@/constants/constants';
import { Link } from '@inertiajs/react';

const LatestProducts = ({ products = [] }) => {
    const [productSwiper, setProductSwiper] = useState(null);
    const latestProducts = [...products].slice(0, 10);

    return (
        <section id="latest-products" className="products-carousel">
            <div className="container-lg overflow-hidden pb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex justify-content-between my-4">
                            <h2 className="section-title">Nuovi arrivi</h2>
                            <div className="d-flex align-items-center">
                                <Link href={route('productList')} className="btn btn-primary me-2">Vedi tutti</Link>
                                <div className="swiper-buttons">
                                    <button className="swiper-prev products-carousel-prev btn btn-primary me-2" onClick={() => productSwiper?.slidePrev()}>❮</button>
                                    <button className="swiper-next products-carousel-next btn btn-primary" onClick={() => productSwiper?.slideNext()}>❯</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Swiper
                            slidesPerView={5}
                            spaceBetween={10}
                            onSwiper={setProductSwiper}
                            navigation={{
                                nextEl: '.products-carousel-next',
                                prevEl: '.products-carousel-prev',
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                576: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                992: {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                                1200: {
                                    slidesPerView: 5,
                                    spaceBetween: 10,
                                },
                            }}
                            data-aos="fade-up" data-aos-delay={100}
                        >
                            {latestProducts.map((product) => (
                                <SwiperSlide key={product.id} className="product-item">
                                    <figure>
                                        <Link href={route('productDetail.index', { slug: product.slug, id: product.id })} title={product.name}>
                                            <img src={STORAGE_URL + product.image_path} alt={product.name} className="tab-image img-fluid" loading="lazy" />
                                        </Link>
                                    </figure>
                                    <div className="d-flex flex-column text-center">
                                        <h3 className="fs-6 fw-normal">{product.name}</h3>
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <span className="text-dark fw-semibold">€{product.price}</span>
                                        </div>
                                        <div className="button-area p-3 pt-0">
                                            <div className="row g-1 mt-2">
                                                <div className="col-3">
                                                    <input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" />
                                                </div>
                                                <div className="col-7">
                                                    <Link href={route('productDetail.index', { slug: product.slug, id: product.id })} className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                                                        <svg width="18" height="18">
                                                            <use xlinkHref="#cart" />
                                                        </svg> Dettagli
                                                    </Link>
                                                </div>
                                                <div className="col-2">
                                                    <button type="button" className="btn btn-outline-dark rounded-1 p-2 fs-6">
                                                        <svg width="18" height="18">
                                                            <use xlinkHref="#heart" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestProducts;
