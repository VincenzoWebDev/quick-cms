import { usePage } from '@inertiajs/react';
import React from 'react';

const OffcanvasNavbar = () => {
    const { categories } = usePage().props;
    return (
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar">
            <div className="offcanvas-header justify-content-between">
                <h4 className="fw-normal text-uppercase fs-6">Menu</h4>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
                    {categories.map((cat) => (
                        <li key={cat.id} className="nav-item border-dashed">
                            <button
                                className="btn btn-toggle dropdown-toggle position-relative w-100 d-flex justify-content-between align-items-center text-dark p-2"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${cat.id}-collapse`}
                                aria-expanded="false"
                            >
                                <div className="d-flex gap-3">
                                    <i className={cat.description}></i>
                                    <span>{cat.name}</span>
                                </div>
                            </button>
                            <div className="collapse" id={`${cat.id}-collapse`}>
                                <ul className="btn-toggle-nav list-unstyled fw-normal ps-5 pb-1">
                                    {cat.children.length > 0 && cat.children.map((child) => (
                                        <li key={child.id} className="border-bottom py-2">
                                            <a href={route('productList.cat', [cat.name.toLowerCase(), child.name.toLowerCase()])} className="dropdown-item">{child.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OffcanvasNavbar;
