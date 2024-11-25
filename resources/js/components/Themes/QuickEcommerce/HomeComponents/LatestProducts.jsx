import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const LatestProducts = () => {
    const products = [
        {
            id: 1,
            title: "Sunstar Fresh Melon Juice",
            img: 'themes/quick_ecommerce/img/product-thumb-20.png',
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discount: "10% OFF",
        },
        {
            id: 2,
            title: "Fresh Oranges",
            img: 'themes/quick_ecommerce/img/product-thumb-21.png',
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discount: "10% OFF",
        },
        {
            id: 3,
            title: "Gourmet Dark Chocolate Bars",
            img: 'themes/quick_ecommerce/img/product-thumb-22.png',
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discount: "10% OFF",
        },
        {
            id: 4,
            title: "Whole Wheat Sandwich Bread",
            img: 'themes/quick_ecommerce/img/product-thumb-23.png',
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discount: "10% OFF",
        },
        {
            id: 5,
            title: "Sunstar Fresh Melon Juice",
            img: 'themes/quick_ecommerce/img/product-thumb-24.png',
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discount: "10% OFF",
        },
        {
            id: 6,
            title: "Sunstar Fresh Melon Juice",
            img: 'themes/quick_ecommerce/img/product-thumb-25.png',
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discount: "10% OFF",
        },
        {
            id: 7,
            title: "Fresh Oranges",
            img: 'themes/quick_ecommerce/img/product-thumb-26.png',
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discount: "10% OFF",
        },
        {
            id: 8,
            title: "Gourmet Dark Chocolate Bars",
            img: 'themes/quick_ecommerce/img/product-thumb-27.png',
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discount: "10% OFF",
        },
        {
            id: 9,
            title: "Whole Wheat Sandwich Bread",
            img: 'themes/quick_ecommerce/img/product-thumb-28.png',
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discount: "10% OFF",
        },
        {
            id: 10,
            title: "Sunstar Fresh Melon Juice",
            img: 'themes/quick_ecommerce/img/product-thumb-29.png',
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discount: "10% OFF",
        },
    ];
    const [productSwiper, setProductSwiper] = useState(null);

    return (
        <section id="latest-products" className="products-carousel">
            <div className="container-lg overflow-hidden pb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex justify-content-between my-4">
                            <h2 className="section-title">Just arrived</h2>
                            <div className="d-flex align-items-center">
                                <a href="#" className="btn btn-primary me-2">View All</a>
                                <div className="swiper-buttons">
                                    <button className="swiper-prev products-carousel-prev btn btn-primary me-2" onClick={() => productSwiper.slidePrev()}>❮</button>
                                    <button className="swiper-next products-carousel-next btn btn-primary" onClick={() => productSwiper.slideNext()}>❯</button>
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
                                nextEl: '.swiper-next',
                                prevEl: '.swiper-prev',
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
                            {products.map(product => (
                                <SwiperSlide key={product.id} className="product-item">
                                    <figure>
                                        <a href="index.html" title={product.title}>
                                            <img src={product.img} alt={product.title} className="tab-image" />
                                        </a>
                                    </figure>
                                    <div className="d-flex flex-column text-center">
                                        <h3 className="fs-6 fw-normal">{product.title}</h3>
                                        <div>
                                            <span className="rating">
                                                {[...Array(5)].map((_, index) => (
                                                    <svg key={index} width="18" height="18" className={index < Math.floor(product.rating) ? 'text-warning' : ''}>
                                                        <use xlinkHref={index < Math.floor(product.rating) ? "#star-full" : "#star-half"} />
                                                    </svg>
                                                ))}
                                            </span>
                                            <span>({product.reviews})</span>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <del>${product.oldPrice.toFixed(2)}</del>
                                            <span className="text-dark fw-semibold">${product.newPrice.toFixed(2)}</span>
                                            <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">{product.discount}</span>
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
                                                        </svg> Add to Cart
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
                </div>
            </div>
        </section>
    );
};

export default LatestProducts;
