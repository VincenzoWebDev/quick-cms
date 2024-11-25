import React from 'react';
import { ParallaxProvider, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

const NewsletterBanner = () => {
    return (
        <ParallaxProvider>
            <section>
                <ParallaxBanner className="text-light my-5">
                    <ParallaxBannerLayer image='themes/quick_ecommerce/img/banner-newsletter.jpg' speed={12} />
                    <div className="text-light py-3 my-5 position-relative" >
                        <div className="container">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-5 p-3">
                                    <div className="section-header">
                                        <h2 className="section-title display-5 text-light">
                                            Ottieni il 25% di sconto sul tuo primo acquisto
                                        </h2>
                                    </div>
                                    <p>Registrati ora per ottenere lo sconto.</p>
                                </div>
                                <div className="col-md-5 p-3">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label d-none">
                                                Nome
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-md rounded-0"
                                                name="name"
                                                id="name"
                                                placeholder="Nome"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label d-none">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control form-control-md rounded-0"
                                                name="email"
                                                id="email"
                                                placeholder="Email Address"
                                            />
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-dark btn-md rounded-0">
                                                Invia
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxBanner >
            </section>
        </ParallaxProvider>
    );
};

export default NewsletterBanner;
