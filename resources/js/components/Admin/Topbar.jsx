import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCollapsed } from '@/redux/collapsedSlice';
import { setDarkTheme } from '@/redux/darkThemeSlice';
import { setRespCollapsed } from '@/redux/respCollapsedSlice';
import { STORAGE_URL } from '@/constants/constants';

const Topbar = () => {
  const { notifications = [], user_auth } = usePage().props;
  const { post } = useForm();
  const { url } = usePage();

  const collapsed = useSelector((state) => state.collapsed.collapsed);
  const respCollapsed = useSelector((state) => state.respCollapsed.respCollapsed);
  const darkTheme = useSelector((state) => state.darkTheme.darkTheme);

  const dispatch = useDispatch();
  const [unreadNotifications, setUnreadNotifications] = useState(notifications);

  const pageTitle = useMemo(() => {
    if (url.endsWith('/admin')) return 'Dashboard';
    if (url.includes('/admin/users')) return 'Utenti';
    if (url.includes('/admin/albums')) return 'Albums';
    if (url.includes('/admin/album_categories')) return 'Categorie Album';
    if (url.includes('/admin/pages')) return 'Pagine';
    if (url.includes('/admin/products')) return 'Prodotti';
    if (url.includes('/admin/categories')) return 'Categorie';
    if (url.includes('/admin/orders')) return 'Ordini';
    if (url.includes('/admin/shipping-methods')) return 'Spedizioni';
    if (url.includes('/admin/files')) return 'File Manager';
    if (url.includes('/admin/settings')) return 'Impostazioni';
    if (url.includes('/admin/profile')) return 'Profilo';
    if (url.includes('/admin/chats')) return 'Chat';
    return 'Pannello di controllo';
  }, [url]);

  const markAsRead = (notificationId) => {
    router.put(route('notifications.markAsRead', notificationId));
    setUnreadNotifications((prev) => prev.filter((notification) => notification.id !== notificationId));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    post(route('logout'));
  };

  const handleSidebarToggle = (e) => {
    e.preventDefault();
    dispatch(setCollapsed(!collapsed));
  };

  const handleMobileSidebarToggle = (e) => {
    e.preventDefault();
    dispatch(setRespCollapsed(!respCollapsed));
  };

  const handleSwitchTheme = () => {
    dispatch(setDarkTheme(!darkTheme));
  };

  const unreadCount = unreadNotifications.filter((notification) => !notification.read_at).length;

  if (!user_auth) {
    return null;
  }

  return (
    <div className="top-navbar">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid w-100">
          <div className="topbar-left">
            <button type="button" className="sidebar-toggle-btn d-none d-lg-inline-flex" onClick={handleSidebarToggle}>
              <i className={`fa-solid ${collapsed ? 'fa-bars' : 'fa-bars-staggered'}`}></i>
            </button>
            <button type="button" className="sidebar-toggle-btn d-inline-flex d-lg-none" onClick={handleMobileSidebarToggle}>
              <i className="fa-solid fa-bars"></i>
            </button>
            <div className="topbar-heading">
              <h4>{pageTitle}</h4>
              <p>Gestisci contenuti, utenti e configurazioni senza lasciare il pannello</p>
            </div>
          </div>

          <div className="topbar-actions">
            <button type="button" className="icon-action-btn" onClick={handleSwitchTheme} title="Cambia tema">
              <i className={`fa-solid ${darkTheme ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>

            <div className="dropdown">
              <button className="icon-action-btn position-relative" data-bs-toggle="dropdown" type="button" title="Notifiche">
                <i className="fa-regular fa-bell"></i>
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
              </button>
              <ul className="dropdown-menu dropdown-menu-end admin-dropdown notifications-dropdown animate__animated animate__fadeInUp">
                {unreadNotifications.length === 0 && <li className="dropdown-item-text text-center">Nessuna notifica</li>}
                {unreadNotifications.map((notification) => (
                  <li key={notification.id}>
                    <div className="dropdown-notification-row">
                      <Link
                        href={notification.data.order_url ? notification.data.order_url : '#'}
                        className="dropdown-item notification-link"
                      >
                        {notification.data.message} {notification.data.user_name ? `- ${notification.data.user_name}` : ''}
                        {notification.data.order_id ? ` #${notification.data.order_id}` : ''}
                      </Link>
                      {!notification.read_at && (
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => markAsRead(notification.id)}
                          type="button"
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <button className="user-chip" data-bs-toggle="dropdown" type="button">
                <img
                  src={STORAGE_URL + user_auth.profile_img}
                  alt={user_auth.name}
                  title={user_auth.name}
                  className="user-img object-fit-cover"
                />
                <span className="d-none d-md-inline">{user_auth.name}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end admin-dropdown animate__animated animate__fadeInUp">
                <li>
                  <Link className="dropdown-item" href={route('admin.profile')}>
                    Profilo
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href={route('home')} target="_blank" rel="noreferrer">
                    Vai al sito
                  </a>
                </li>
                <li>
                  <Link className="dropdown-item text-danger" href="#" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
