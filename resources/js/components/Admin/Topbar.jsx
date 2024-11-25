import { Link, useForm, usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkTheme } from '@/redux/darkThemeSlice';
import { setCollapsed } from '@/redux/collapsedSlice';
import { setRespCollapsed } from '@/redux/respCollapsedSlice';
import { STORAGE_URL } from '@/constants/constants';

const Topbar = () => {
    const { notifications, user_auth } = usePage().props;
    const { post } = useForm();
    const [unreadNotifications, setUnreadNotifications] = useState(notifications);
    const dispatch = useDispatch();

    const markAsRead = (notificationId) => {
        router.put(route('notifications.markAsRead', notificationId));

        const updatedNotifications = unreadNotifications.filter(notification => notification.id !== notificationId);
        setUnreadNotifications(updatedNotifications);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    }

    const collapsed = useSelector(state => state.collapsed.collapsed);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setCollapsed(!collapsed));
    }

    const respCollapsed = useSelector(state => state.respCollapsed.respCollapsed);

    const handleResponsiveClick = (e) => {
        e.preventDefault();
        dispatch(setRespCollapsed(!respCollapsed));
    }

    const darkTheme = useSelector(state => state.darkTheme.darkTheme);

    const handleSwitchTheme = () => {
        if (darkTheme) {
            dispatch(setDarkTheme(false));
        } else {
            dispatch(setDarkTheme(true));
        }
    }
    // Animazione personalizzata
    useEffect(() => {
        document.documentElement.style.setProperty('--animate-duration', '0.2s');
    }, []);
    return (
        <div className="top-navbar">
            <nav className="navbar navbar-expand-lg">
                {/* <div className="container-fluid"> */}
                <div className="container-fluid w-100">
                    <div className='d-flex align-items-center'>
                        <a href='#' className={`arrow-icon d-xl-block d-lg-block d-md-none d-none ${collapsed ? 'open' : ''}`} id="sidebarCollapse" onClick={handleClick}>
                            <span className="left-bar"></span>
                            <span className="right-bar"></span>
                        </a>
                        <h4 className="mb-0">Dashboard</h4>
                    </div>

                    <div className='mx-4 d-lg-block d-xl-block d-sm-block d-md-block d-none'>
                        {user_auth && (
                            <div className="text-center w-100">
                                <span className="mb-0">Ciao <label className="ct-primary fw-bold">{user_auth.name}</label>, Benvenuto in Quick CMS</span>
                            </div>
                        )}
                    </div>

                    <div className='d-flex align-items-center'>
                        <button className={`d-inline-block d-lg-none ml-auto more-button`} onClick={handleResponsiveClick} type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i className="fa-solid fa-bars"></i>
                        </button>

                        <div className="navbar-collapse d-lg-block d-xl-block d-sm-none d-md-none d-none"
                            id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto align-items-center">
                                {user_auth &&
                                    <>
                                        <li className="nav-item dropdown px-2">
                                            <a href="#" className="nav-link" role="button" data-bs-toggle="dropdown">
                                                <i className="fa-solid fa-bell"></i>
                                                <span className="notification">{unreadNotifications.length}</span>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end animate__animated animate__fadeInUp">
                                                {unreadNotifications.length === 0 && (
                                                    <li className='text-center'>
                                                        <span className='dropdown-item'>Nessuna Notifica</span>
                                                    </li>
                                                )}
                                                {unreadNotifications.map(notification => (
                                                    <li key={notification.id} className='text-center d-flex align-items-center'>
                                                        <a href={notification.data.order_url ? notification.data.order_url : '#'} className='dropdown-item my-2'>
                                                            {notification.data.message} - {notification.data.user_name ? notification.data.user_name : '#' + notification.data.order_id}
                                                        </a>
                                                        {!notification.read_at && (
                                                            <a href='#' onClick={() => markAsRead(notification.id)} className='pe-3'>
                                                                <i className="fa-solid fa-trash text-danger"></i>
                                                            </a>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown px-2">
                                            <a href="#" className="nav-link" role="button" data-bs-toggle="dropdown">
                                                <i className="fa-solid fa-gear"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu animate__animated animate__fadeInUp">
                                                <li>
                                                    <div className="form-check form-switch d-flex p-0">
                                                        <span className='dropdown-item'>Light mode</span>
                                                        <input className="form-check-input theme-switch ms-0" type="checkbox" role="switch" id="flexSwitchCheckDefault8"
                                                            style={{ width: '40px', height: '20px' }} checked={darkTheme ? true : false} onChange={handleSwitchTheme} />
                                                        <span className='dropdown-item'>Dark mode</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                }

                                <li className="nav-item">
                                    {!user_auth ? (
                                        <ul className='d-flex'>
                                            <li className="nav-item">
                                                <Link className="nav-link" href={route('login')}>Login</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" href={route('register')}>Register</Link>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul>
                                            <li className="nav-item dropdown">
                                                <a id="navbarDropdown" className="nav-link user user-box " href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <img src={STORAGE_URL + user_auth.profile_img} alt={user_auth.name} title={user_auth.name} className="user-img object-fit-cover" />
                                                    <div className="user-info">
                                                        <div className="user-name">{user_auth.name}</div>
                                                    </div>
                                                </a>

                                                <div className="dropdown-menu dropdown-menu-end animate__animated animate__fadeInUp" aria-labelledby="navbarDropdown">
                                                    <Link className="dropdown-item border-bottom" href={route('profile')}>Profilo</Link>
                                                    <Link className="dropdown-item" href="#" onClick={handleLogout}>Logout</Link>
                                                </div>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                {user_auth &&
                                    <li className="nav-item" style={{ width: 'max-content' }}>
                                        <a className="nav-link" href={route('home')} target="_blank">
                                            Vai al sito
                                            <i className="fa-solid fa-circle-right ms-2"></i>
                                        </a>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div >
            </nav >
        </div >

    )
}

export default Topbar