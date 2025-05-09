import { Link, usePage, useForm, router } from '@inertiajs/react';
import logoThumb from '@/../../public/img/logo_thumb.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkTheme } from '@/redux/darkThemeSlice';
import { STORAGE_URL } from '@/constants/constants';

const Sidebar = () => {
  const { notifications, user_auth, ecommerce_status } = usePage().props;
  const [unreadNotifications, setUnreadNotifications] = useState(notifications);

  const darkTheme = useSelector((state) => state.darkTheme.darkTheme);
  const dispatch = useDispatch();

  const markAsRead = (notificationId) => {
    router.put(route('notifications.markAsRead', notificationId));

    const updatedNotifications = unreadNotifications.filter((notification) => notification.id !== notificationId);
    setUnreadNotifications(updatedNotifications);
  };

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

  // Funzione per verificare se il link inizia con una determinata stringa RETURN -> BOOL
  const startLink = (path) => {
    return url.startsWith(path);
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
  };

  const collapsed = useSelector((state) => state.collapsed.collapsed);
  const respCollapsed = useSelector((state) => state.respCollapsed.respCollapsed);

  return (
    <nav id="sidebar" className={`${collapsed ? 'active' : ''} ${respCollapsed ? 'show-nav' : ''}`}>
      <div className="sidebar-header">
        <h3>
          <img src={logoThumb} className="img-fluid" />
          <span className="align-middle">Quick CMS</span>
        </h3>
      </div>
      {user_auth ? (
        <ul className="list-unstyled components">
          <div className="form-check form-switch d-flex ps-0 pb-3 align-items-center text-center border-bottom d-lg-none">
            <span className="dropdown-item">Light mode</span>
            <input
              className="form-check-input theme-switch ms-0"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault0"
              style={{ width: '40px', height: '20px' }}
              checked={darkTheme ? true : false}
              onChange={handleSwitchTheme}
            />
            <span className="dropdown-item">Dark mode</span>
          </div>
          <li className="dropdown d-lg-none d-md-block d-xl-none d-sm-block mt-2">
            <a href="#homeSubmenu1" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
              {user_auth ? (
                <img
                  src={STORAGE_URL + user_auth.profile_img}
                  user_name={user_auth.name}
                  className="img-fluid object-fit-cover me-3 rounded-circle"
                  style={{ width: '40px', height: '40px' }}
                />
              ) : (
                <i className="material-icons rounded-circle">person</i>
              )}
              <span>{user_auth ? user_auth.name : 'user'}</span>
            </a>
            <ul className="collapse list-unstyled menu" id="homeSubmenu1">
              <li>
                {!user_auth ? (
                  <>
                    <Link className="nav-link" href={route('login')}>
                      Login
                    </Link>
                    <Link className="nav-link" href={route('register')}>
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="dropdown-item border-bottom rounded-0" href={route('profile')}>
                      Profilo
                    </Link>
                    <>
                      <a href="#" className="nav-link border-bottom" role="button" data-bs-toggle="dropdown">
                        Notifiche - <span className="notification text-danger">{unreadNotifications.length}</span>
                      </a>
                      <ul className="dropdown-menu dropdown-menu">
                        {unreadNotifications.length === 0 && (
                          <li className="text-center">
                            <span className="dropdown-item">Nessuna Notifica</span>
                          </li>
                        )}
                        {unreadNotifications.map((notification) => (
                          <li key={notification.id} className="d-flex align-items-center p-0">
                            <a href="#" className="dropdown-item my-2">
                              {notification.data.message} - {notification.data.user_name}
                            </a>
                            {!notification.read_at && (
                              <a href="#" onClick={() => markAsRead(notification.id)} className="p-0">
                                <i className="fa-solid fa-trash text-danger fs-5 pb-3"></i>
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                    <Link className="dropdown-item" href="#" onClick={handleLogout}>
                      Logout
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </li>

          {collapsed ? (
            <>
              <div>
                <span className="mb-2 d-block ps-3 fw-bold text-uppercase border-bottom pb-2">Amministrazione</span>
                <li className={includeLink('/admin') && endLink('/admin') ? 'active' : ''}>
                  <Link href={route('admin')} className="dashboard">
                    <i className="material-icons">dashboard</i>
                    <span>Dashboard</span>
                  </Link>
                </li>

                <li className={includeLink('/users') ? 'active' : ''}>
                  <Link href={route('users.index')} className="users">
                    <i className="material-icons">person</i>
                    <span>Users</span>
                  </Link>
                </li>
              </div>

              <div>
                <span className="mb-2 d-block ps-3 fw-bold text-uppercase border-bottom pb-2">Contenuti</span>
                <li className={includeLink('/albums') || includeLink('/photos') ? 'active' : ''}>
                  <Link href={route('albums')} className="albums">
                    <i className="material-icons">photo_library</i>
                    <span>Albums</span>
                  </Link>
                </li>

                <li className={includeLink('/album_categories') ? 'active' : ''}>
                  <Link href={route('album.categories.index')} className="themes">
                    <i className="material-icons">view_comfy</i>
                    <span>Categorie</span>
                  </Link>
                </li>

                <li className={includeLink('/admin/pages') ? 'active' : ''}>
                  <Link href={route('pages.index')} className="pages">
                    <i className="material-icons">content_copy</i>
                    <span>Pagine</span>
                  </Link>
                </li>
              </div>

              {ecommerce_status === '1' && (
                <div>
                  <span className="mb-2 d-block ps-3 fw-bold text-uppercase border-bottom pb-2">Negozio</span>
                  <li className={includeLink('/products') ? 'active' : ''}>
                    <Link href={route('products.index')} className="products">
                      <i className="material-icons">store</i>
                      <span>Prodotti</span>
                    </Link>
                  </li>
                  <li className={includeLink('/orders') ? 'active' : ''}>
                    <Link href={route('orders.index')} className="orders">
                      <i className="material-icons">assignment</i>
                      <span>Ordini</span>
                    </Link>
                  </li>
                  <li className={includeLink('/categories') ? 'active' : ''}>
                    <Link href={route('categories.index')} className="categories">
                      <i className="material-icons">label_outline</i>
                      <span>Categorie</span>
                    </Link>
                  </li>
                  <li className={includeLink('/shipping-methods') ? 'active' : ''}>
                    <Link href={route('shipping-methods.index')} className="shipping-methods">
                      <i className="material-icons">local_shipping</i>
                      <span>Spedizioni</span>
                    </Link>
                  </li>
                </div>
              )}

              <div>
                <span className="mb-2 d-block ps-3 fw-bold text-uppercase border-bottom pb-2">Supporto</span>
                <li className={includeLink('/chats') ? 'active' : ''}>
                  <Link href={route('chats.index')} className="chats">
                    <i className="material-icons">chat</i>
                    <span>Chat</span>
                  </Link>
                </li>
              </div>

              <div>
                <span className="mb-2 d-block ps-3 fw-bold text-uppercase border-bottom pb-2">Gestione file</span>
                <li className={includeLink('/files') ? 'active' : ''}>
                  <Link href={route('files')} className="files">
                    <i className="material-icons">storage</i>
                    <span>Files</span>
                  </Link>
                </li>
              </div>
              <div>
                <span className="mb-2 d-block ps-3 fw-bold text-uppercase border-bottom pb-2">Impostazioni</span>
                <li
                  className={
                    endLink('/settings') || endLink('/settings/create') || startLink('/admin/settings/edit')
                      ? 'active'
                      : ''
                  }
                >
                  <Link href={route('settings.index')} className="settings">
                    <i className="material-icons">settings</i>
                    <span>Generali</span>
                  </Link>
                </li>
                <li className={includeLink('/themes') ? 'active' : ''}>
                  <Link href={route('themes.index')} className="themes">
                    <i className="material-icons">style</i>
                    <span>Temi</span>
                  </Link>
                </li>
                <li className={includeLink('/layouts') ? 'active' : ''}>
                  <Link href={route('settings.layouts.index')} className="layouts">
                    <i className="material-icons">layers</i>
                    <span>Layout pagine</span>
                  </Link>
                </li>
                {ecommerce_status === '1' && (
                  <li className={includeLink('/variants') ? 'active' : ''}>
                    <Link href={route('settings.variants.index')} className="variants">
                      <i className="material-icons">clear_all</i>
                      <span>Varianti prodotti</span>
                    </Link>
                  </li>
                )}
              </div>
            </>
          ) : (
            <div className="accordion" id="accordionSidebar">
              {/* Sezione Amministrazione */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingAdmin">
                  <button
                    style={{ backgroundColor: 'transparent', color: 'inherit', boxShadow: 'none' }}
                    className={`accordion-button py-1 fw-bold text-uppercase bg-white ${
                      (includeLink('/admin') && endLink('admin')) || includeLink('/users') ? '' : 'collapsed'
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseAdmin"
                    aria-expanded={
                      (includeLink('/admin') && endLink('admin')) || includeLink('/users') ? 'true' : 'false'
                    }
                    aria-controls="collapseAdmin"
                  >
                    Amministrazione
                  </button>
                </h2>
                <div
                  id="collapseAdmin"
                  className={`accordion-collapse py-2 collapse ${
                    (includeLink('/admin') && endLink('admin')) || includeLink('/users') ? 'show' : ''
                  }`}
                  aria-labelledby="headingAdmin"
                  data-bs-parent="#accordionSidebar"
                >
                  <div className="accordion-body p-0">
                    <li className={includeLink('/admin') && endLink('/admin') ? 'active' : ''}>
                      <Link href={route('admin')} className="dashboard">
                        <i className="material-icons">dashboard</i> Dashboard
                      </Link>
                    </li>
                    <li className={includeLink('/users') ? 'active' : ''}>
                      <Link href={route('users.index')} className="users">
                        <i className="material-icons">person</i> Users
                      </Link>
                    </li>
                  </div>
                </div>
              </div>

              {/* Sezione Contenuti */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingContenuti">
                  <button
                    style={{ backgroundColor: 'transparent', color: 'inherit', boxShadow: 'none' }}
                    className={`accordion-button py-1 fw-bold text-uppercase bg-white ${
                      includeLink('/albums') ||
                      includeLink('/photos') ||
                      includeLink('/album_categories') ||
                      includeLink('/admin/pages')
                        ? ''
                        : 'collapsed'
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseContenuti"
                    aria-expanded={
                      includeLink('/albums') ||
                      includeLink('/photos') ||
                      includeLink('/album_categories') ||
                      includeLink('/admin/pages')
                        ? 'true'
                        : 'false'
                    }
                    aria-controls="collapseContenuti"
                  >
                    Contenuti
                  </button>
                </h2>
                <div
                  id="collapseContenuti"
                  className={`accordion-collapse py-2 collapse ${
                    includeLink('/albums') ||
                    includeLink('/photos') ||
                    includeLink('/album_categories') ||
                    includeLink('/admin/pages')
                      ? 'show'
                      : ''
                  }`}
                  aria-labelledby="headingContenuti"
                  data-bs-parent="#accordionSidebar"
                >
                  <div className="accordion-body p-0">
                    <li className={includeLink('/albums') ? 'active' : ''}>
                      <Link href={route('albums')} className="albums">
                        <i className="material-icons">photo_album</i> Albums
                      </Link>
                    </li>
                    {/* <li className={includeLink('/photos') ? 'active' : ''}>
          <Link href={route('photos.index')} className="photos">
            <i className="material-icons">image</i> Photos
          </Link>
        </li> */}
                    <li className={includeLink('/album_categories') ? 'active' : ''}>
                      <Link href={route('album.categories.index')} className="categories">
                        <i className="material-icons">category</i> Categorie Album
                      </Link>
                    </li>
                    <li className={includeLink('/admin/pages') ? 'active' : ''}>
                      <Link href={route('pages.index')} className="pages">
                        <i className="material-icons">description</i> Pagine
                      </Link>
                    </li>
                  </div>
                </div>
              </div>

              {/* Sezione Negozio (solo se abilitata) */}
              {ecommerce_status === '1' && (
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingShop">
                    <button
                      style={{ backgroundColor: 'transparent', color: 'inherit', boxShadow: 'none' }}
                      className={`accordion-button py-1 fw-bold text-uppercase bg-white ${
                        includeLink('/products') ||
                        includeLink('/orders') ||
                        includeLink('/categories') ||
                        includeLink('/shipping-methods')
                          ? ''
                          : 'collapsed'
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseShop"
                      aria-expanded={
                        includeLink('/products') ||
                        includeLink('/orders') ||
                        includeLink('/categories') ||
                        includeLink('/shipping-methods')
                          ? 'true'
                          : 'false'
                      }
                      aria-controls="collapseShop"
                    >
                      Negozio
                    </button>
                  </h2>
                  <div
                    id="collapseShop"
                    className={`accordion-collapse py-2 collapse ${
                      includeLink('/products') ||
                      includeLink('/orders') ||
                      includeLink('/categories') ||
                      includeLink('/shipping-methods')
                        ? 'show'
                        : ''
                    }`}
                    aria-labelledby="headingShop"
                    data-bs-parent="#accordionSidebar"
                  >
                    <div className="accordion-body p-0">
                      <li className={includeLink('/products') ? 'active' : ''}>
                        <Link href={route('products.index')} className="products">
                          <i className="material-icons">store</i> Prodotti
                        </Link>
                      </li>
                      <li className={includeLink('/orders') ? 'active' : ''}>
                        <Link href={route('orders.index')} className="orders">
                          <i className="material-icons">assignment</i> Ordini
                        </Link>
                      </li>
                      <li className={includeLink('/categories') ? 'active' : ''}>
                        <Link href={route('categories.index')} className="categories">
                          <i className="material-icons">label_outline</i> Categorie
                        </Link>
                      </li>
                      <li className={includeLink('/shipping-methods') ? 'active' : ''}>
                        <Link href={route('shipping-methods.index')} className="shipping-methods">
                          <i className="material-icons">local_shipping</i> Spedizioni
                        </Link>
                      </li>
                    </div>
                  </div>
                </div>
              )}

              {/* Supporto */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSupporto">
                  <button
                    style={{ backgroundColor: 'transparent', color: 'inherit', boxShadow: 'none' }}
                    className={`accordion-button py-1 fw-bold text-uppercase bg-white ${
                      includeLink('/chats') ? '' : 'collapsed'
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSupporto"
                    aria-expanded={includeLink('/chats') ? 'true' : 'false'}
                    aria-controls="collapseSupporto"
                  >
                    Supporto
                  </button>
                </h2>
                <div
                  id="collapseSupporto"
                  className={`accordion-collapse py-2 collapse ${includeLink('/chats') ? 'show' : ''}`}
                  aria-labelledby="headingSupporto"
                  data-bs-parent="#accordionSidebar"
                >
                  <div className="accordion-body p-0">
                    <li className={includeLink('/chats') ? 'active' : ''}>
                      <Link href={route('chats.index')} className="chats">
                        <i className="material-icons">chat</i> Chat
                      </Link>
                    </li>
                  </div>
                </div>
              </div>

              {/* File */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFiles">
                  <button
                    style={{ backgroundColor: 'transparent', color: 'inherit', boxShadow: 'none' }}
                    className={`accordion-button py-1 fw-bold text-uppercase bg-white ${
                      includeLink('/files') ? '' : 'collapsed'
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFiles"
                    aria-expanded={includeLink('/files') ? 'true' : 'false'}
                    aria-controls="collapseFiles"
                  >
                    Gestione file
                  </button>
                </h2>
                <div
                  id="collapseFiles"
                  className={`accordion-collapse py-2 collapse ${includeLink('/files') ? 'show' : ''}`}
                  aria-labelledby="headingFiles"
                  data-bs-parent="#accordionSidebar"
                >
                  <div className="accordion-body p-0">
                    <li className={includeLink('/files') ? 'active' : ''}>
                      <Link href={route('files')} className="files">
                        <i className="material-icons">storage</i> Files
                      </Link>
                    </li>
                  </div>
                </div>
              </div>

              {/* Impostazioni */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSettings">
                  <button
                    style={{ backgroundColor: 'transparent', color: 'inherit', boxShadow: 'none' }}
                    className={`accordion-button py-1 fw-bold text-uppercase bg-white ${
                      endLink('/settings') || endLink('/themes') || includeLink('/layouts') || includeLink('/variants')
                        ? ''
                        : 'collapsed'
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSettings"
                    aria-expanded={
                      endLink('/settings') || endLink('/themes') || includeLink('/layouts') || includeLink('/variants')
                        ? 'true'
                        : 'false'
                    }
                    aria-controls="collapseSettings"
                  >
                    Impostazioni
                  </button>
                </h2>
                <div
                  id="collapseSettings"
                  style={{ backgroundColor: 'transparent', color: 'inherit', boxShadow: 'none' }}
                  className={`accordion-collapse py-2 collapse ${
                    endLink('/settings') ||
                    includeLink('/settings') ||
                    endLink('/themes') ||
                    includeLink('/themes') ||
                    endLink('/layouts') ||
                    includeLink('/variants') ||
                    includeLink('/variant-values')
                      ? 'show'
                      : ''
                  }`}
                  aria-labelledby="headingSettings"
                  data-bs-parent="#accordionSidebar"
                >
                  <div className="accordion-body p-0">
                    <li
                      className={
                        endLink('/settings') || endLink('/settings/create') || startLink('/admin/settings/edit')
                          ? 'active'
                          : ''
                      }
                    >
                      <Link href={route('settings.index')} className="settings">
                        <i className="material-icons">settings</i> Generali
                      </Link>
                    </li>
                    <li className={endLink('/themes') || includeLink('/themes') ? 'active' : ''}>
                      <Link href={route('themes.index')} className="themes">
                        <i className="material-icons">style</i> Temi
                      </Link>
                    </li>
                    <li className={includeLink('/layouts') ? 'active' : ''}>
                      <Link href={route('settings.layouts.index')} className="layouts">
                        <i className="material-icons">layers</i> Layout pagine
                      </Link>
                    </li>
                    {ecommerce_status === '1' && (
                      <li
                        className={
                          endLink('/variants') || includeLink('/variants') || includeLink('/variant-values')
                            ? 'active'
                            : ''
                        }
                      >
                        <Link href={route('settings.variants.index')} className="variants">
                          <i className="material-icons">clear_all</i> Varianti prodotti
                        </Link>
                      </li>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </ul>
      ) : (
        <div className="text-center py-5 px-1 fw-bold">
          <span>Accedi per vedere i contenuti</span>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
