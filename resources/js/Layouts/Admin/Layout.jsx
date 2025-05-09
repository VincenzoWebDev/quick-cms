import 'bootstrap/dist/js/bootstrap.bundle.js';
import { useEffect, useState } from 'react';
import 'animate.css';
import { useDispatch, useSelector } from 'react-redux';
import { setRespCollapsed } from '@/redux/respCollapsedSlice';
import { Sidebar, Topbar, Copyright, HeaderTitle, Skeleton } from '@/components/Admin/Index';
import { Inertia } from '@inertiajs/inertia';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePage } from '@inertiajs/react';
import DemoModeBanner from '@/components/DemoModeBanner';

const Layout = ({ children }) => {
  const { demo_mode } = usePage().props;
  const dispatch = useDispatch();
  const respCollapsed = useSelector((state) => state.respCollapsed.respCollapsed);
  const collapsed = useSelector((state) => state.collapsed.collapsed);
  const darkTheme = useSelector((state) => state.darkTheme.darkTheme);

  const [isLoading, setIsLoading] = useState(false); // Stato per il caricamento

  // Gestione del caricamento con Inertia
  useEffect(() => {
    const start = (event) => {
      // Mostra lo skeleton solo per una navigazione completa, non per le richieste parziali (ad es. ricerche AJAX)
      if (!event.detail.visit.preserveState) {
        setIsLoading(true);
      }
    };
    const finish = () => setIsLoading(false);

    Inertia.on('start', start);
    Inertia.on('finish', finish);

    // Cleanup event listeners su unmount
    return () => {
      Inertia.on('start', start);
      Inertia.on('finish', finish);
    };
  }, []);

  // Memorizzazione di 'collapsed' in localStorage
  useEffect(() => {
    localStorage.setItem('collapsed', collapsed);
  }, [collapsed]);

  // Gestione del tema dark
  useEffect(() => {
    if (darkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('data-theme', 'light');
    }
  }, [darkTheme]);

  // Animazione personalizzata
  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.setProperty('--animate-duration', '0.5s');
    }
  }, []);

  return (
    <>
      <HeaderTitle />
      <div className="wrapper">
        {demo_mode == 1 && <DemoModeBanner />}
        <div
          className={`body-overlay ${respCollapsed ? 'show-nav' : ''}`}
          onClick={() => dispatch(setRespCollapsed(!respCollapsed))}
        ></div>
        <Sidebar />
        <div id="content" className={collapsed ? 'active' : ''}>
          <Topbar />

          {/* Mostra lo Skeleton durante il caricamento */}
          {isLoading ? (
            <div className="main-content">
              <Skeleton />
            </div>
          ) : (
            <div className="main-content animate__animated animate__fadeIn">
              <ToastContainer style={{ marginTop: `${demo_mode == 1 ? '90px' : '60px'}` }} />
              {children}
            </div>
          )}
          <Copyright />
        </div>
      </div>
    </>
  );
};

export default Layout;
