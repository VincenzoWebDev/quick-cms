import { Link, usePage, useForm, router } from '@inertiajs/react';
import logoThumb from "@/../../public/img/logo_thumb.png";
import { useState } from 'react';

const Sidebar = ({ user_auth, collapsed, respCollapsed, dataTheme, setTheme }) => {
    const { notifications } = usePage().props;
    const [unreadNotifications, setUnreadNotifications] = useState(notifications);

    const markAsRead = (notificationId) => {
        router.put(route('notifications.markAsRead', notificationId));

        const updatedNotifications = unreadNotifications.filter(notification => notification.id !== notificationId);
        setUnreadNotifications(updatedNotifications);
    }

    const { post } = useForm();
    const { url } = usePage();
    // Funzione per verificare lo se il link contiene la stringa RETURN -> BOOL
    const includeLink = (path) => {
        return url.includes(path);
    };
    // Funzione per verificare lo se il link finisce con una determinata stringa RETURN -> BOOL
    const endLink = (path) => {
        return url.endsWith(path);
    };
    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };
    const handleSwitchTheme = () => {
        if (dataTheme) {
            setTheme(false);
        } else {
            setTheme(true);
        }
    }

    return (
        <nav id="sidebar" className={`${collapsed ? 'active' : ''} ${respCollapsed ? 'show-nav' : ''}`}>
            <div className="sidebar-header">
                <h3><img src={logoThumb} className="img-fluid" /><span className='align-middle'>Quick CMS</span></h3>
            </div>
            <ul className="list-unstyled components">
                <div className="form-check form-switch d-flex ps-0 pb-3 align-items-center text-center border-bottom d-lg-none">
                    <span className='dropdown-item'>Light mode</span>
                    <input className="form-check-input theme-switch ms-0" type="checkbox" role="switch" id="flexSwitchCheckDefault0"
                        style={{ width: '40px', height: '20px' }} checked={dataTheme ? true : false} onChange={handleSwitchTheme} />
                    <span className='dropdown-item'>Dark mode</span>
                </div>
                <li className="dropdown d-lg-none d-md-block d-xl-none d-sm-block mt-2">
                    <a href="#homeSubmenu1" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                        {user_auth ? <img src={user_auth.profile_img} user_name={user_auth.name} /> : <i className="material-icons">person</i>}
                        <span>{user_auth ? user_auth.name : 'user'}</span>
                    </a>
                    <ul className="collapse list-unstyled menu" id="homeSubmenu1">
                        <li>
                            {!user_auth ? (
                                <>
                                    <Link className="nav-link" href={route('login')}>Login</Link>
                                    <Link className="nav-link" href={route('register')}>Register</Link>
                                </>

                            ) : (
                                <>
                                    <Link className="dropdown-item border-bottom rounded-0" href={route('profile')}>Profilo</Link>
                                    <>
                                        <a href="#" className="nav-link border-bottom" role="button" data-bs-toggle="dropdown">
                                            Notifiche - <span className="notification text-danger">{unreadNotifications.length}</span>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu">
                                            {unreadNotifications.length === 0 && (
                                                <li className='text-center'>
                                                    <span className='dropdown-item'>Nessuna Notifica</span>
                                                </li>
                                            )}
                                            {unreadNotifications.map(notification => (
                                                <li key={notification.id} className='d-flex align-items-center p-0'>
                                                    <a href="#" className='dropdown-item my-2'>{notification.data.message} - {notification.data.user_name}</a>
                                                    {!notification.read_at && (
                                                        <a href='#' onClick={() => markAsRead(notification.id)} className='p-0'><i className="fa-solid fa-trash text-danger fs-5 pb-3"></i></a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                    <Link className="dropdown-item" href="#" onClick={handleLogout}>Logout</Link>
                                </>
                            )}
                        </li>
                    </ul>
                </li>

                {/* <div className="small-screen navbar-display">
                    <li className="dropdown d-lg-none d-md-block d-xl-none d-sm-block">
                        <a href="#homeSubmenu0" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                            <i className="material-icons">notifications</i><span> 4 notification</span></a>
                        <ul className="collapse list-unstyled menu" id="homeSubmenu0">
                            <li>
                                <a href="#">You have 5 new messages</a>
                            </li>
                            <li>
                                <a href="#">You're now friend with Mike</a>
                            </li>
                            <li>
                                <a href="#">Wish Mary on her birthday!</a>
                            </li>
                            <li>
                                <a href="#">5 warnings in Server Console</a>
                            </li>
                        </ul>
                    </li>
                </div> */}


                <li className={includeLink("/admin") && endLink("/admin") ? 'active' : ''}>
                    <Link href={route('admin')} className="dashboard"><i
                        className="material-icons">dashboard</i><span>Dashboard</span></Link>
                </li>

                <li className={includeLink("/users") ? 'active' : ''}>
                    <Link href={route('users')} className="users"><i
                        className="material-icons">person</i><span>Users</span></Link>
                </li>

                <li
                    className={includeLink("/albums") || includeLink("/photos") ? 'active' : ''}>
                    <Link href={route('albums')} className="albums"><i
                        className="material-icons">photo_library</i><span>Albums</span></Link>
                </li>

                <li className={includeLink("/categories") ? 'active' : ''}>
                    <Link href={route('categories.index')} className="themes"><i
                        className="material-icons">view_comfy</i><span>Categorie</span></Link>
                </li>

                <li className={includeLink("/admin/pages") ? 'active' : ''}>
                    <Link href={route('pages.index')} className="pages"><i
                        className="material-icons">content_copy</i><span>Pagine</span></Link>
                </li>

                {/* <li className={includeLink("/themes") ? 'active' : ''}>
                    <Link href={route('themes')} className="themes"><i
                        className="material-icons">color_lens</i><span>Temi</span></Link>
                </li> */}

                {/* <li className="dropdown">
                    <a href="#pageSubmenu4" className="themes dropdown-toggle" data-bs-toggle="collapse" aria-expanded="false"><i
                        className="material-icons">color_lens</i><span>Temi</span></a>
                    <ul className="collapse list-unstyled menu show" id="pageSubmenu4">
                        <li className={includeLink("/themes") ? 'active' : ''}>
                            <Link href={route('themes')}>Page 1</Link>
                        </li>
                        <li>
                            <a href="#">Page 2</a>
                        </li>
                        <li>
                            <a href="#">Page 3</a>
                        </li>
                    </ul>
                </li> */}

                {/* <li className="dropdown">
                    <a href="#pageSubmenu5" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                        <i className="material-icons">border_color</i><span>forms</span></a>
                    <ul className="collapse list-unstyled menu" id="pageSubmenu5">
                        <li>
                            <a href="#">Page 1</a>
                        </li>
                        <li>
                            <a href="#">Page 2</a>
                        </li>
                        <li>
                            <a href="#">Page 3</a>
                        </li>
                    </ul>
                </li>

                <li className="dropdown">
                    <a href="#pageSubmenu6" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                        <i className="material-icons">grid_on</i><span>tables</span></a>
                    <ul className="collapse list-unstyled menu" id="pageSubmenu6">
                        <li>
                            <a href="#">Page 1</a>
                        </li>
                        <li>
                            <a href="#">Page 2</a>
                        </li>
                        <li>
                            <a href="#">Page 3</a>
                        </li>
                    </ul>
                </li>

                <li className="">
                    <a href="#"><i className="material-icons">date_range</i><span>copy</span></a>
                </li>

                <li className="">
                    <a href="#"><i className="material-icons">library_books</i><span>Calender</span></a>
                </li> */}
            </ul >
        </nav >

    )
}

export default Sidebar