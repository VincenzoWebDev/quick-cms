import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import Swiper from 'swiper';
import SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules';
SwiperCore.use([Autoplay]);
import 'swiper/swiper-bundle.css';
import { BASE_URL } from '@/constants/constants';

const CategorySection = () => {
    const { categories } = usePage().props;
    const [categorySwiper, setCategorySwiper] = useState(null);

    useEffect(() => {
        const categorySwiper = new Swiper('.category-carousel', {
            slidesPerView: 8,
            spaceBetween: 30,
            speed: 500,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            loop: true,
            navigation: {
                nextEl: '.category-carousel-next',
                prevEl: '.category-carousel-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 5,
                },
                1500: {
                    slidesPerView: 8,
                },
            },
        });
        setCategorySwiper(categorySwiper);

        return () => {
            // Assicurati di distruggere il Swiper quando il componente si smonta
            if (categorySwiper) {
                categorySwiper.destroy();
                setCategorySwiper(null);
            }
        };
    }, []);

    return (
        <section className="py-5 overflow-hidden">
            <div className="container-lg">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex flex-wrap justify-content-between mb-5">
                            <h2 className="section-title">Categorie</h2>
                            <div className="d-flex align-items-center">
                                <a href="#" className="btn btn-primary me-2">Vedi tutte</a>
                                <div className="swiper-buttons">
                                    <button className="swiper-prev category-carousel-prev btn btn-primary me-2" onClick={() => categorySwiper.slidePrev()}>❮</button>
                                    <button className="swiper-next category-carousel-next btn btn-primary" onClick={() => categorySwiper.slideNext()}>❯</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="category-carousel swiper">
                            <div className="swiper-wrapper">
                                {
                                    categories.map((category) => (
                                        <a href="#" className="nav-link swiper-slide text-center" key={category.id}>
                                            <img src={BASE_URL + category.image_path} className="rounded-circle" alt={category.name} loading='lazy' />
                                            <h4 className="fs-6 mt-3 fw-normal category-title">{category.name}</h4>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
