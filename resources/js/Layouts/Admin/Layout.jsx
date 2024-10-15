import 'bootstrap/dist/js/bootstrap.bundle.js';
import { useEffect } from 'react';
import 'animate.css';
import { useDispatch, useSelector } from 'react-redux';
import { setRespCollapsed } from '@/redux/respCollapsedSlice';
import { Sidebar, Topbar, Copyright, HeaderTitle } from '@/components/Admin/Index';

const Layout = ({ children }) => {
    const dispatch = useDispatch();

    const respCollapsed = useSelector(state => state.respCollapsed.respCollapsed);
    // non uso useEffect su 'respCollapsed' perchè nel responsive non serve memorizare la 'collapsed' in localStorage
    const collapsed = useSelector(state => state.collapsed.collapsed);

    // Ogni volta che 'collapsed' cambia, aggiorna localStorage
    useEffect(() => {
        localStorage.setItem('collapsed', collapsed);
    }, [collapsed]); // Dipendenza su 'collapsed'

    const darkTheme = useSelector(state => state.darkTheme.darkTheme);

    useEffect(() => {
        if (darkTheme) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('data-theme', 'light');
        }
    }, [darkTheme]);

    useEffect(() => {
        document.documentElement.style.setProperty('--animate-duration', '0.5s');
    }, []);

    return (
        <>
            <HeaderTitle />
            <div className="wrapper">
                <div className={`body-overlay ${respCollapsed ? 'show-nav' : ''}`} onClick={() => dispatch(setRespCollapsed(!respCollapsed))}></div>
                <Sidebar />
                <div id="content" className={collapsed ? 'active' : ''}>
                    <Topbar />
                    <div className="main-content animate__animated animate__fadeIn">
                        {children}
                    </div>
                    <Copyright />
                </div>
            </div>
        </>
    );
}

export default Layout;