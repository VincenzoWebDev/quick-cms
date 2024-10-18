import { Link, usePage, useForm, router } from '@inertiajs/react';
import logoThumb from "@/../../public/img/logo_thumb.png";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkTheme } from '@/redux/darkThemeSlice';
import { STORAGE_URL } from '@/constants/constants';

const Sidebar = () => {
    const { notifications, user_auth } = usePage().props;
    const [unreadNotifications, setUnreadNotifications] = useState(notifications);

    const darkTheme = useSelector(state => state.darkTheme.darkTheme);
    const dispatch = useDispatch();

    const markAsRead = (notificationId) => {
        router.put(route('notifications.markAsRead', notificationId));

        const updatedNotifications = unreadNotifications.filter(notification => notification.id !== notificationId);
        setUnreadNotifications(updatedNotifications);
    }

    const { post } = useForm();
    const { url } = usePage();
    // Funzione per verificare se il link contiene la stringa RETURN -> BOOL
    const includeLink = (path) => {
        return url.includes(path);
    };
    // Funzione per verificare se il link finisce con una determinata stringa RETURN -> BOOL
    const endLink = (path) => {
        return url.endsWith(path);
    };
    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };
    const handleSwitchTheme = () => {
        if (darkTheme) {
            dispatch(setDarkTheme(false));
        } else {
            dispatch(setDarkTheme(true));
        }
    }

    const collapsed = useSelector(state => state.collapsed.collapsed);
    const respCollapsed = useSelector(state => state.respCollapsed.respCollapsed);

    return (
        <nav id="sidebar" className={`${collapsed ? 'active' : ''} ${respCollapsed ? 'show-nav' : ''}`}>
            <div className="sidebar-header">
                <h3><img src={logoThumb} className="img-fluid" /><span className='align-middle'>Quick CMS</span></h3>
            </div>
            {user_auth ? (
                <ul className="list-unstyled components">
                    <div className="form-check form-switch d-flex ps-0 pb-3 align-items-center text-center border-bottom d-lg-none">
                        <span className='dropdown-item'>Light mode</span>
                        <input className="form-check-input theme-switch ms-0" type="checkbox" role="switch" id="flexSwitchCheckDefault0"
                            style={{ width: '40px', height: '20px' }} checked={darkTheme ? true : false} onChange={handleSwitchTheme} />
                        <span className='dropdown-item'>Dark mode</span>
                    </div>
                    <li className="dropdown d-lg-none d-md-block d-xl-none d-sm-block mt-2">
                        <a href="#homeSubmenu1" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                            {user_auth ? <img src={STORAGE_URL + user_auth.profile_img} user_name={user_auth.name} className='img-fluid object-fit-cover me-3 rounded-circle' style={{ width: '40px', height: '40px' }} /> :
                                <i className="material-icons rounded-circle">person</i>}
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

                    <div>
                        <span className='mb-2 d-block ps-3 fw-bold text-uppercase border-bottom pb-2'>Amministrazione</span>
                        <li className={includeLink("/admin") && endLink("/admin") ? 'active' : ''}>
                            <Link preserveState href={route('admin')} className="dashboard"><i
                                className="material-icons">dashboard</i><span>Dashboard</span></Link>
                        </li>

                        <li className={includeLink("/users") ? 'active' : ''}>
                            <Link preserveState href={route('users.index')} className="users"><i
                                className="material-icons">person</i><span>Users</span></Link>
                        </li>
                    </div>

                    <div>
                        <span className='mb-2 d-block ps-3 fw-bold text-uppercase border-bottom pb-2'>Contenuti</span>
                        <li
                            className={includeLink("/albums") || includeLink("/photos") ? 'active' : ''}>
                            <Link preserveState href={route('albums')} className="albums"><i
                                className="material-icons">photo_library</i><span>Albums</span></Link>
                        </li>

                        <li className={includeLink("/album_categories") ? 'active' : ''}>
                            <Link preserveState href={route('album.categories.index')} className="themes"><i
                                className="material-icons">view_comfy</i><span>Categorie</span></Link>
                        </li>

                        <li className={includeLink("/admin/pages") ? 'active' : ''}>
                            <Link preserveState href={route('pages.index')} className="pages"><i
                                className="material-icons">content_copy</i><span>Pagine</span></Link>
                        </li>
                    </div>

                    <div>
                        <span className='mb-2 d-block ps-3 fw-bold text-uppercase border-bottom pb-2'>Negozio</span>
                        <li
                            className={includeLink("/products") ? 'active' : ''}>
                            <Link preserveState href={route('products.index')} className="products"><i
                                className="material-icons">store</i><span>Prodotti</span></Link>
                        </li>
                        <li
                            className={includeLink("/orders") ? 'active' : ''}>
                            <Link preserveState href={route('orders.index')} className="orders">
                                <i className="material-icons">assignment</i><span>Ordini</span></Link>
                        </li>
                        <li
                            className={includeLink("/categories") ? 'active' : ''}>
                            <Link preserveState href={route('categories.index')} className="categories"><i
                                className="material-icons">label_outline</i><span>Categorie</span></Link>
                        </li>
                        <li
                            className={includeLink("/shipping-methods") ? 'active' : ''}>
                            <Link preserveState href={route('shipping-methods.index')} className="shipping-methods">
                                <i className="material-icons">local_shipping</i><span>Spedizioni</span></Link>
                        </li>
                    </div>

                    <div>
                        <span className='mb-2 d-block ps-3 fw-bold text-uppercase border-bottom pb-2'>Gestione file</span>
                        <li className={includeLink("/files") ? 'active' : ''}>
                            <Link preserveState href={route('files')} className="files"><i
                                className="material-icons">storage</i><span>Files</span></Link>
                        </li>
                    </div>
                    <div>
                        <span className='mb-2 d-block ps-3 fw-bold text-uppercase border-bottom pb-2'>Impostazioni</span>
                        <li className={endLink("/settings") ? 'active' : ''}>
                            <Link preserveState href={route('settings.index')} className="settings"><i
                                className="material-icons">settings</i><span>Generali</span></Link>
                        </li>
                        <li className={includeLink("/layouts") ? 'active' : ''}>
                            <Link preserveState href={route('settings.layouts.index')} className="layouts"><i
                                className="material-icons">layers</i><span>Layout pagine</span></Link>
                        </li>
                    </div>
                </ul >
            ) : (
                <div className="text-center py-5 px-1 fw-bold">
                    <span>Accedi per vedere i contenuti</span>
                </div>
            )}
        </nav >

    )
}

export default Sidebar