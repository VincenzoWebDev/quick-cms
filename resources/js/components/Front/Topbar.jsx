import { Link } from '@inertiajs/react';

const Topbar = ({ pages }) => {

    return (
        <header data-bs-theme="dark">
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="">Carousel</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href={route('home')}>Home</Link>
                            </li>
                            {pages.map((page) => (
                                <li className="nav-item" key={page.id}>
                                    {page.active === 1 &&
                                        <Link className="nav-link active" aria-current="page" href={route('page.show', page.slug)}>{page.title}</Link>
                                    }
                                </li>
                            ))}
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Topbar;