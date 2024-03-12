import { useState, useEffect } from 'react';
import Sidebar from '@/components/Admin/Sidebar';
import Topbar from '@/components/Admin/Topbar';
import Copyright from '@/components/Admin/Copyright';
import 'animate.css';

const Layout = ({ children, user_auth }) => {
    const savedCollapsed = localStorage.getItem('collapsed') === 'true';
    const [collapsed, setCollapsed] = useState(savedCollapsed);
    const savedTheme = localStorage.getItem('data-theme') === 'dark';
    const [dataTheme, setTheme] = useState(savedTheme);
    const savedRespCollapsed = localStorage.getItem('show-nav') === 'true';
    const [respCollapsed, setRespCollapsed] = useState(savedRespCollapsed);

    useEffect(() => {
        if (dataTheme) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('data-theme', 'light');
        }
    });
    // NON SERVE SALVARE LO STATO DELLA SIDEBAR NEL RESPONSIVE
    // useEffect(() => {
    //     if (respCollapsed) {
    //         localStorage.setItem('show-nav', 'true');
    //     } else {
    //         localStorage.setItem('show-nav', 'false');
    //     }
    // }, [respCollapsed]);
    useEffect(() => {
        localStorage.setItem('collapsed', collapsed);
    }, [collapsed]);
    useEffect(() => {
        document.documentElement.style.setProperty('--animate-duration', '0.5s');
    }, []);

    return (
        <div className="wrapper">
            <div className={`body-overlay ${respCollapsed ? 'show-nav' : ''}`} onClick={() => setRespCollapsed(!respCollapsed)}></div>
            <Sidebar user_auth={user_auth} collapsed={collapsed} respCollapsed={respCollapsed} dataTheme={dataTheme} setTheme={setTheme} />
            <div id="content" className={collapsed ? 'active' : ''}>
                <Topbar user_auth={user_auth} collapsed={collapsed} setCollapsed={setCollapsed} respCollapsed={respCollapsed} setRespCollapsed={setRespCollapsed} dataTheme={dataTheme} setTheme={setTheme} />
                <div className="main-content animate__animated animate__fadeIn">
                    {children}
                </div>
                <Copyright />
            </div>
        </div>
    );
}

export default Layout;