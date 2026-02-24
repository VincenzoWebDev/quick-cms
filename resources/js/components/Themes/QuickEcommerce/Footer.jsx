import React from 'react';
import logo from '../../../../../public/themes/quick_ecommerce/img/logo.svg';
import { Link } from '@inertiajs/react';

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
                                        <button type="button" className="btn btn-outline-light">
                                            <svg width="16" height="16"><use xlinkHref="#facebook" /></svg>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="btn btn-outline-light">
                                            <svg width="16" height="16"><use xlinkHref="#twitter" /></svg>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="btn btn-outline-light">
                                            <svg width="16" height="16"><use xlinkHref="#youtube" /></svg>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="btn btn-outline-light">
                                            <svg width="16" height="16"><use xlinkHref="#instagram" /></svg>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="btn btn-outline-light">
                                            <svg width="16" height="16"><use xlinkHref="#amazon" /></svg>
                                        </button>
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
                                    <Link href={route('home')} className="nav-link">About us</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Conditions</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Our Journals</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Careers</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Affiliate Programme</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Ultras Press</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-2 col-sm-6">
                        <div className="footer-menu">
                            <h5 className="widget-title">Quick Links</h5>
                            <ul className="menu-list list-unstyled">
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Offers</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Discount Coupons</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Stores</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Track Order</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('productList')} className="nav-link">Shop</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Info</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-2 col-sm-6">
                        <div className="footer-menu">
                            <h5 className="widget-title">Customer Service</h5>
                            <ul className="menu-list list-unstyled">
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">FAQ</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Contact</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Privacy Policy</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Returns & Refunds</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Cookie Guidelines</Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('home')} className="nav-link">Delivery Information</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="footer-menu">
                            <h5 className="widget-title">Subscribe Us</h5>
                            <p>Subscribe to our newsletter to get updates about our grand offers.</p>
                            <form className="d-flex mt-3 gap-0" onSubmit={(e) => e.preventDefault()}>
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
