import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { STORAGE_URL } from '@/constants/constants';

const FeaturedProducts = ({ products }) => {
    const [productSwiper, setProductSwiper] = useState(null);

    return (
        <section id="featured-products" className="products-carousel">
            <div className="container-lg overflow-hidden py-5">
                <div className="section-header d-flex flex-wrap justify-content-between my-4">
                    <h2 className="section-title">Featured products</h2>
                    <div className="d-flex align-items-center">
                        <a href="#" className="btn btn-primary me-2">View All</a>
                        <div className="swiper-buttons">
                            <button className="swiper-prev products-carousel-prev btn btn-primary me-2" onClick={() => productSwiper.slidePrev()}>❮</button>
                            <button className="swiper-next products-carousel-next btn btn-primary" onClick={() => productSwiper.slideNext()}>❯</button>
                        </div>
                    </div>
                </div>

                <Swiper
                    slidesPerView={5}
                    spaceBetween={10}
                    onSwiper={setProductSwiper}
                    navigation={{
                        prevEl: '.products-carousel-prev',
                        nextEl: '.products-carousel-next',
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
                    className="swiper-wrapper"
                    data-aos="fade-up" data-aos-delay={100}
                >
                    {products.map((product, index) => (
                        <SwiperSlide key={product.id} className="product-item">
                            <figure>
                                <a href="#" title={product.name}>
                                    <img src={STORAGE_URL + product.image_path} alt="Product Thumbnail" className="tab-image img-fluid" />
                                </a>
                            </figure>
                            <div className="d-flex flex-column text-center">
                                <h3 className="fs-6 fw-normal">{product.name}</h3>
                                <div>
                                    <span className="rating">
                                        {[...Array(5)].map((_, index) => (
                                            <svg
                                                key={index}
                                                width="18"
                                                height="18"
                                                className={index < Math.floor(product.rating) ? 'text-warning' : 'text-muted'}
                                            >
                                                <use xlinkHref={index < product.rating ? '#star-full' : '#star-half'} />
                                            </svg>
                                        ))}
                                    </span>
                                    <span>({product.reviews})</span>
                                </div>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <span>${product.price}</span>
                                    {/* <span className="text-dark fw-semibold">${product.discountedPrice.toFixed(2)}</span> */}
                                    {/* <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                                        {product.discountPercentage}
                                    </span> */}
                                </div>
                                <div className="button-area p-3 pt-0">
                                    <div className="row g-1 mt-2">
                                        <div className="col-3">
                                            <input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" />
                                        </div>
                                        <div className="col-7">
                                            <a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                                                <svg width="18" height="18">
                                                    <use xlinkHref="#cart" />
                                                </svg> Aggiungi
                                            </a>
                                        </div>
                                        <div className="col-2">
                                            <a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6">
                                                <svg width="18" height="18">
                                                    <use xlinkHref="#heart" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FeaturedProducts;
