import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import logo from '../../../../../public/themes/quick_ecommerce/img/logo.svg';

const Header = () => {
  const { pages, categories, user_auth, ecommerce_status, cart_items } = usePage().props;
  const { post } = useForm();

  const handleLogout = (e) => {
    e.preventDefault();
    post(route('user.profile.logout'));
  };

  return (
    <header>
      <div className="">
        <div className="row py-3 shadow-sm m-0">
          <div className="col-sm-4 col-lg-2 text-center text-sm-start d-flex gap-3 justify-content-center justify-content-md-start">
            <div className="d-flex align-items-center my-3 my-sm-0">
              <Link href={route('home')}>
                <img src={logo} alt="logo" width="200" className="img-fluid" />
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <use xlinkHref="#menu"></use>
              </svg>
            </button>
          </div>

          <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-4">
            <div className="search-bar row bg-light p-2 rounded-4 align-items-center">
              <div className="col-md-4 d-none d-md-block">
                <select className="form-select border-0 bg-transparent text-start">
                  <option>Categorie</option>
                  {categories.map((category) => (
                    <option key={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-11 col-md-7">
                <form id="search-form" className="text-center" action="/" method="post">
                  <input
                    type="text"
                    className="form-control border-0 bg-transparent"
                    placeholder="Cerca tra più di 20.000 prodotti"
                  />
                </form>
              </div>
              <div className="col-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="col-lg-4 align-content-center">
            <ul className="navbar-nav list-unstyled d-flex flex-row gap-3 gap-lg-5 justify-content-center flex-wrap align-items-center mb-0 fw-bold text-uppercase text-dark">
              <li className="nav-item active">
                <Link href={route('home')} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item active">
                <a href={route('admin')} className="nav-link" target="_blank">
                  Pannello
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle pe-3"
                  role="button"
                  id="pages"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  pagine
                </a>
                <ul
                  className="dropdown-menu border-0 p-1 mt-5 rounded-0 shadow animate__animated animate__fadeInUp"
                  aria-labelledby="pages"
                >
                  {pages.map(
                    (page) =>
                      page.active == 1 && (
                        <li key={page.id}>
                          <Link href={route('page.show', page.slug)} className="dropdown-item text-capitalize">
                            {page.title}
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              </li>
            </ul>
          </div>

          <div className="col-lg-2">
            <ul className="navbar-nav list-unstyled d-flex flex-row justify-content-center flex-wrap align-items-center mb-0 fw-bold text-uppercase text-dark">
              {user_auth && ecommerce_status === '1' ? (
                <>
                  <li className="nav-item dropdown dropdown-menu-end">
                    <a
                      className="nav-link p-2"
                      role="button"
                      id="profile"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg width="24" height="24">
                        <use xlinkHref="#user"></use>
                      </svg>
                    </a>
                    <ul
                      className="dropdown-menu border-0 p-1 mt-5 rounded-0 shadow animate__animated animate__fadeInUp"
                      aria-labelledby="profile"
                    >
                      <li>
                        <Link className="dropdown-item text-capitalize" href={route('user.profile.index')}>
                          Profilo
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item text-capitalize" href="#" onClick={handleLogout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link to="/wishlist" className="p-2 mx-1">
                      <svg width="24" height="24">
                        <use xlinkHref="#wishlist"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="p-1 mx-1 btn btn-link cart-icon"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasCart"
                      aria-controls="offcanvasCart"
                    >
                      <svg width="24" height="24">
                        <use xlinkHref="#shopping-bag"></use>
                      </svg>
                      <span className="cart-count">{cart_items.length}</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown dropdown-menu-end">
                  <a
                    className="nav-link p-2"
                    role="button"
                    id="profile"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg width="24" height="24">
                      <use xlinkHref="#user"></use>
                    </svg>
                  </a>
                  <ul
                    className="dropdown-menu border-0 p-1 mt-5 rounded-0 shadow animate__animated animate__fadeInUp"
                    aria-labelledby="profile"
                  >
                    <li>
                      <Link className="dropdown-item text-capitalize" href={route('user.profile.login.index')}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-capitalize" href="#">
                        Registrati
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
