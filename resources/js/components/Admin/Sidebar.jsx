import { Link, useForm, usePage } from '@inertiajs/react';
import logoThumb from '@/../../public/img/logo_thumb.png';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkTheme } from '@/redux/darkThemeSlice';
import { STORAGE_URL } from '@/constants/constants';
import { useEffect, useRef } from 'react';

const Sidebar = () => {
  const sidebarScrollRef = useRef(null);
  const scrollAnimationRef = useRef(null);
  const SIDEBAR_SCROLL_KEY = 'quickcms_admin_sidebar_scroll';

  const { notifications = [], user_auth, ecommerce_status } = usePage().props;
  const { url } = usePage();
  const { post } = useForm();

  const darkTheme = useSelector((state) => state.darkTheme.darkTheme);
  const collapsed = useSelector((state) => state.collapsed.collapsed);
  const respCollapsed = useSelector((state) => state.respCollapsed.respCollapsed);
  const dispatch = useDispatch();

  const isCurrent = (matcher) => matcher(url);

  const sections = [
    {
      title: 'Amministrazione',
      items: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          href: route('admin'),
          active: isCurrent((currentUrl) => currentUrl.includes('/admin') && currentUrl.endsWith('/admin')),
        },
        {
          label: 'Users',
          icon: 'person',
          href: route('users.index'),
          active: isCurrent((currentUrl) => currentUrl.includes('/users')),
        },
      ],
    },
    {
      title: 'Contenuti',
      items: [
        {
          label: 'Albums',
          icon: 'photo_library',
          href: route('albums'),
          active: isCurrent((currentUrl) => currentUrl.includes('/albums') || currentUrl.includes('/photos')),
        },
        {
          label: 'Categorie Album',
          icon: 'view_comfy',
          href: route('album.categories.index'),
          active: isCurrent((currentUrl) => currentUrl.includes('/album_categories')),
        },
        {
          label: 'Pagine',
          icon: 'content_copy',
          href: route('pages.index'),
          active: isCurrent((currentUrl) => currentUrl.includes('/admin/pages')),
        },
      ],
    },
    ...(ecommerce_status === '1'
      ? [
          {
            title: 'Negozio',
            items: [
              {
                label: 'Prodotti',
                icon: 'store',
                href: route('products.index'),
                active: isCurrent((currentUrl) => currentUrl.includes('/products')),
              },
              {
                label: 'Ordini',
                icon: 'assignment',
                href: route('orders.index'),
                active: isCurrent((currentUrl) => currentUrl.includes('/orders')),
              },
              {
                label: 'Categorie',
                icon: 'label_outline',
                href: route('categories.index'),
                active: isCurrent((currentUrl) => currentUrl.includes('/categories')),
              },
              {
                label: 'Spedizioni',
                icon: 'local_shipping',
                href: route('shipping-methods.index'),
                active: isCurrent((currentUrl) => currentUrl.includes('/shipping-methods')),
              },
            ],
          },
        ]
      : []),
    {
      title: 'Supporto',
      items: [
        {
          label: 'Chat',
          icon: 'chat',
          href: route('chats.index'),
          active: isCurrent((currentUrl) => currentUrl.includes('/chats')),
        },
      ],
    },
    {
      title: 'Gestione File',
      items: [
        {
          label: 'Files',
          icon: 'storage',
          href: route('files'),
          active: isCurrent((currentUrl) => currentUrl.includes('/files')),
        },
      ],
    },
    {
      title: 'Impostazioni',
      items: [
        {
          label: 'Generali',
          icon: 'settings',
          href: route('settings.index'),
          active: isCurrent(
            (currentUrl) =>
              currentUrl.endsWith('/settings') ||
              currentUrl.endsWith('/settings/create') ||
              currentUrl.startsWith('/admin/settings/edit')
          ),
        },
        {
          label: 'Temi',
          icon: 'style',
          href: route('themes.index'),
          active: isCurrent((currentUrl) => currentUrl.includes('/themes')),
        },
        {
          label: 'Layout Pagine',
          icon: 'layers',
          href: route('settings.layouts.index'),
          active: isCurrent((currentUrl) => currentUrl.includes('/layouts')),
        },
        ...(ecommerce_status === '1'
          ? [
              {
                label: 'Varianti',
                icon: 'clear_all',
                href: route('settings.variants.index'),
                active: isCurrent(
                  (currentUrl) =>
                    currentUrl.includes('/variants') ||
                    currentUrl.includes('/variant-values')
                ),
              },
            ]
          : []),
      ],
    },
  ];

  const unreadNotifications = notifications.filter((notification) => !notification.read_at).length;

  const handleLogout = (e) => {
    e.preventDefault();
    post(route('logout'));
  };

  const handleSwitchTheme = () => {
    dispatch(setDarkTheme(!darkTheme));
  };

  const animateSidebarScroll = (element, to, duration = 280) => {
    const from = element.scrollTop;
    const distance = to - from;
    if (Math.abs(distance) < 2) return;

    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }

    const start = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      element.scrollTop = from + distance * easeOutCubic(progress);
      if (progress < 1) {
        scrollAnimationRef.current = requestAnimationFrame(step);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const scrollEl = sidebarScrollRef.current;
    if (!scrollEl || typeof window === 'undefined') return;

    const savedValue = window.sessionStorage.getItem(SIDEBAR_SCROLL_KEY);
    if (savedValue !== null) scrollEl.scrollTop = Number(savedValue) || 0;

    const activeLink = scrollEl.querySelector('.admin-nav-link.active');
    if (!activeLink) return;

    requestAnimationFrame(() => {
      const targetCenter = activeLink.offsetTop - (scrollEl.clientHeight / 2) + (activeLink.clientHeight / 2);
      const maxScrollTop = Math.max(0, scrollEl.scrollHeight - scrollEl.clientHeight);
      const nextScrollTop = Math.max(0, Math.min(targetCenter, maxScrollTop));
      animateSidebarScroll(scrollEl, nextScrollTop, 320);
    });
  }, [url]);

  useEffect(() => {
    const scrollEl = sidebarScrollRef.current;
    if (!scrollEl || typeof window === 'undefined') return;

    const handleScroll = () => {
      window.sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(scrollEl.scrollTop));
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  if (!user_auth) {
    return (
      <nav id="sidebar" className={`${collapsed ? 'active' : ''} ${respCollapsed ? 'show-nav' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-wrap">
            <img src={logoThumb} className="img-fluid" alt="Quick CMS" />
            <div className="brand-meta">
              <span className="brand-title">Quick CMS</span>
              <small>Admin Workspace</small>
            </div>
          </div>
        </div>
        <div className="empty-auth-state">Accedi per vedere i contenuti amministrativi</div>
      </nav>
    );
  }

  return (
    <nav id="sidebar" className={`${collapsed ? 'active' : ''} ${respCollapsed ? 'show-nav' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-wrap">
          <img src={logoThumb} className="img-fluid" alt="Quick CMS" />
          <div className="brand-meta">
            <span className="brand-title">Quick CMS</span>
            <small>Pannello Admin</small>
          </div>
        </div>
      </div>

      <div className="sidebar-scroll" ref={sidebarScrollRef}>
        <div className="sidebar-user">
          <img
            src={STORAGE_URL + user_auth.profile_img}
            alt={user_auth.name}
            title={user_auth.name}
            className="sidebar-user-avatar object-fit-cover"
          />
          <div className="sidebar-user-meta">
            <strong>{user_auth.name}</strong>
            <span>Gestione contenuti</span>
          </div>
        </div>

        <ul className="list-unstyled components">
          {sections.map((section) => (
            <li key={section.title} className="sidebar-group">
              <span className="sidebar-group-title">{section.title}</span>
              <ul className="list-unstyled sidebar-group-list">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={`admin-nav-link ${item.active ? 'active' : ''}`}>
                      <i className="material-icons">{item.icon}</i>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer-tools">
          <button className="theme-toggle" type="button" onClick={handleSwitchTheme}>
            <i className={`fa-solid ${darkTheme ? 'fa-moon' : 'fa-sun'}`}></i>
            <span>{darkTheme ? 'Tema scuro' : 'Tema chiaro'}</span>
          </button>

          <div className="sidebar-footer-meta">
            <Link href={route('admin.profile')} className="sidebar-mini-link">
              <i className="fa-regular fa-user"></i>
              <span>Profilo</span>
            </Link>
            <a href={route('home')} target="_blank" className="sidebar-mini-link" rel="noreferrer">
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
              <span>Sito</span>
            </a>
            <a href="#" onClick={handleLogout} className="sidebar-mini-link sidebar-mini-danger">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </a>
          </div>

          <div className="sidebar-notify-pill">
            <span>Notifiche</span>
            <strong>{unreadNotifications}</strong>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
