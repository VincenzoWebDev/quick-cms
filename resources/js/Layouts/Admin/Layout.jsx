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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const start = (event) => {
      if (!event.detail.visit.preserveState) {
        setIsLoading(true);
      }
    };

    const finish = () => setIsLoading(false);

    const removeStart = Inertia.on('start', start);
    const removeFinish = Inertia.on('finish', finish);

    return () => {
      if (typeof removeStart === 'function') {
        removeStart();
      }
      if (typeof removeFinish === 'function') {
        removeFinish();
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('collapsed', collapsed);
  }, [collapsed]);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('data-theme', 'light');
    }
  }, [darkTheme]);

  return (
    <>
      <HeaderTitle />
      <div className="wrapper admin-shell">
        {demo_mode == 1 && <DemoModeBanner />}

        <div
          className={`body-overlay ${respCollapsed ? 'show-nav' : ''}`}
          onClick={() => dispatch(setRespCollapsed(!respCollapsed))}
        ></div>

        <Sidebar />

        <div id="content" className={collapsed ? 'active' : ''}>
          <Topbar />

          {isLoading ? (
            <div className="main-content">
              <Skeleton />
            </div>
          ) : (
            <div className="main-content animate__animated animate__fadeIn">
              <ToastContainer
                position="top-right"
                className="admin-toast-container"
                style={{ top: `${demo_mode == 1 ? '124px' : '96px'}`, right: '16px' }}
                newestOnTop
                limit={4}
              />
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
