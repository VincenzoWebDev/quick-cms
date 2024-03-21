import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const Topbar = ({ pages }) => {
    useEffect(() => {
        const header = document.querySelector('.navbar-container');
        const nav = document.querySelector('.navbar');
        const logo = document.querySelector('.navbar-brand img');
        const handleScroll = () => {
            if (window.scrollY > 0) {
                header.classList.remove('navabr-container');
                header.classList.add('navbar-container-scroll');
                nav.classList.add('navbar-scrolled');
                logo.style = 'width: 80px';
            } else {
                header.classList.remove('navbar-container-scroll');
                header.classList.add('navbar-container');
                nav.classList.remove('navbar-scrolled');
                logo.style = 'width: 100px';
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

    return (
        <header data-bs-theme="dark">
            <div className="navbar-container fixed-top">
                <nav className="navbar navbar-expand-md p-3 navbar-scroll">
                    <a className="navbar-brand" href={route('home')}>
                        <img src={'themes/quick_cms/img/logo.png'} alt="Logo" width="100px" className='img-fluid' />
                    </a>
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
                                <li className="nav-item" key={page.id}>
                                    {page.active === 1 &&
                                        <Link className="nav-link active rolling-text" aria-current="page" href={route('page.show', page.slug)}>{page.title}</Link>
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>
        </header >
    )
}

export default Topbar;