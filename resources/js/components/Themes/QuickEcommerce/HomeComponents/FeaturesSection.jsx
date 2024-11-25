import React from 'react';

const FeaturesSection = () => {
    return (
        <section className="py-5">
            <div className="container-lg">
                <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-5">
                    <div className="col" data-aos="flip-up" data-aos-delay="100">
                        <div className="card mb-3 border border-dark-subtle p-3">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32"><use xlinkHref="#package" /></svg>
                            </div>
                            <div className="card-body p-0">
                                <h5 style={{height: '48px'}}>Free delivery</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col" data-aos="flip-up" data-aos-delay="200">
                        <div className="card mb-3 border border-dark-subtle p-3">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32"><use xlinkHref="#secure" /></svg>
                            </div>
                            <div className="card-body p-0">
                                <h5 style={{height: '48px'}}>100% secure payment</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col" data-aos="flip-up" data-aos-delay="300">
                        <div className="card mb-3 border border-dark-subtle p-3">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32"><use xlinkHref="#quality" /></svg>
                            </div>
                            <div className="card-body p-0">
                                <h5 style={{height: '48px'}}>Quality guarantee</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col" data-aos="flip-up" data-aos-delay="400">
                        <div className="card mb-3 border border-dark-subtle p-3">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32"><use xlinkHref="#savings" /></svg>
                            </div>
                            <div className="card-body p-0">
                                <h5 style={{height: '48px'}}>Guaranteed savings</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col" data-aos="flip-up" data-aos-delay="500">
                        <div className="card mb-3 border border-dark-subtle p-3">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32"><use xlinkHref="#offers" /></svg>
                            </div>
                            <div className="card-body p-0">
                                <h5 style={{height: '48px'}}>Daily offers</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
