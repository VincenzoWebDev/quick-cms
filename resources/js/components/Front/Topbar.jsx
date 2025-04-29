import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import logo from '../../../../public/themes/quick_cms/img/logo.png';

const Topbar = () => {
    const { pages, user_auth, cart_items, ecommerce_status } = usePage().props;
    const { post } = useForm();

    useEffect(() => {
        const header = document.querySelector('.navbar-container');
        const nav = document.querySelector('.navbar');
        const logo = document.querySelector('.logo-container');
        const handleScroll = () => {
            if (window.scrollY > 0) {
                header.classList.remove('navabr-container');
                header.classList.add('navbar-container-scroll');
                nav.classList.add('navbar-scrolled');
                logo.style = 'width: 60px';
            } else {
                header.classList.remove('navbar-container-scroll');
                header.classList.add('navbar-container');
                nav.classList.remove('navbar-scrolled');
                logo.style = 'width: 80px';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            const elements = document.querySelectorAll('.rolling-text');

            elements.forEach(element => {
                const innerText = element.innerText;
                element.innerHTML = '';

                const textContainer = document.createElement('div');
                textContainer.classList.add('block');

                for (let letter of innerText) {
                    const span = document.createElement('span');
                    span.innerText = letter.trim() === '' ? '\xa0' : letter;
                    span.classList.add('letter');
                    textContainer.appendChild(span);
                }

                element.appendChild(textContainer);
                element.appendChild(textContainer.cloneNode(true));
            });

            setInitialized(true);
        }
    }, [initialized]);

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('front.user.logout'));
    }

    return (
        <header data-bs-theme="dark">
            <div className="navbar-container fixed-top">
                <nav className="navbar navbar-expand-md px-3 py-0 navbar-scroll d-flex justify-content-between align-content-center">
                    <Link className="navbar-brand" href={route('home')}>
                        <div className='logo-container'>
                            <img src={logo} alt="Logo" className='img-fluid' />
                        </div>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link className="nav-link active rolling-text" aria-current="page" href={route('home')}>Home</Link>
                            </li>
                            {pages.map((page) => (
                                page.active == 1 &&
                                <li className="nav-item" key={page.id}>
                                    <Link className="nav-link active rolling-text" aria-current="page" href={route('page.show', page.slug)}>{page.title}</Link>
                                </li>
                            ))}
                            {user_auth && ecommerce_status === '1' &&
                                <li className="nav-item dropdown">
                                    <a className="text-white px-1" role="button" data-bs-toggle="dropdown" aria-current="page" ><i className="fa-solid fa-user"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-end bg-white">
                                        <li>
                                            <Link className="dropdown-item text-dark" href={route('user.profile.index')}>Profilo</Link>
                                        </li>
                                        <li>
                                            <a className="dropdown-item text-dark" href="#" onClick={handleLogout}>Logout</a>
                                        </li>
                                    </ul>
                                </li>
                            }
                            {!user_auth && ecommerce_status === '1' &&
                                <li className="nav-item">
                                    <Link className="nav-link active rolling-text" aria-current="page" href={route('front.user.login')}>Login</Link>
                                </li>
                            }
                            {cart_items && ecommerce_status === '1' &&
                                <li className="nav-item">
                                    <Link className="cart-icon text-white ms-2" aria-current="page" href={route('cart.index')}>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        <span className="cart-count">{cart_items.length}</span>
                                    </Link>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </header >
    )
}

export default Topbar;