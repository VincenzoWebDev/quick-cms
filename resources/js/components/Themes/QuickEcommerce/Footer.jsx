import React from 'react';
import logo from '../../../../../public/themes/quick_ecommerce/img/logo.svg';

const Footer = () => {
    return (
        <footer className="py-5">
            <div className="container-lg">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="footer-menu">
                            <img src={logo} width="240" height="70" alt="logo" />
                            <div className="social-links mt-3">
                                <ul className="d-flex list-unstyled gap-2">
                                    <li>
                                        <a href="#" className="btn btn-outline-light">
                                            <svg width="16" height="16"><use xlinkHref="#facebook" /></svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="btn btn-outline-light">
                                            <svg width="16" height="16"><use xlinkHref="#twitter" /></svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="btn btn-outline-light">
                                            <svg width="16" height="16"><use xlinkHref="#youtube" /></svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="btn btn-outline-light">
                                            <svg width="16" height="16"><use xlinkHref="#instagram" /></svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="btn btn-outline-light">
                                            <svg width="16" height="16"><use xlinkHref="#amazon" /></svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2 col-sm-6">
                        <div className="footer-menu">
                            <h5 className="widget-title">Organic</h5>
                            <ul className="menu-list list-unstyled">
                                <li className="menu-item">
                                    <a href="#" className="nav-link">About us</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Conditions</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Our Journals</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Careers</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Affiliate Programme</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Ultras Press</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-2 col-sm-6">
                        <div className="footer-menu">
                            <h5 className="widget-title">Quick Links</h5>
                            <ul className="menu-list list-unstyled">
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Offers</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Discount Coupons</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Stores</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Track Order</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Shop</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Info</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-2 col-sm-6">
                        <div className="footer-menu">
                            <h5 className="widget-title">Customer Service</h5>
                            <ul className="menu-list list-unstyled">
                                <li className="menu-item">
                                    <a href="#" className="nav-link">FAQ</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Contact</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Privacy Policy</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Returns & Refunds</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Cookie Guidelines</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="nav-link">Delivery Information</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="footer-menu">
                            <h5 className="widget-title">Subscribe Us</h5>
                            <p>Subscribe to our newsletter to get updates about our grand offers.</p>
                            <form className="d-flex mt-3 gap-0" action="index.html">
                                <input className="form-control rounded-start rounded-0 bg-light" type="email" placeholder="Email Address" aria-label="Email Address" />
                                <button className="btn btn-dark rounded-end rounded-0" type="submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
