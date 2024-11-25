import 'bootstrap/dist/js/bootstrap.bundle.js';
import Topbar from "@/components/Front/Topbar";
import Slideshow from "@/components/Front/Slideshow";
import { React, useEffect } from "react";
import Footer from "@/components/Front/Footer";
import 'animate.css';
import { usePage } from "@inertiajs/react";

const FrontLayout = ({ children }) => {
    const { url } = usePage();
    useEffect(() => {
        document.documentElement.style.setProperty('--animate-duration', '0.5s');
    }, []);

    return (
        <>
            <Topbar />
            <main>
                <Slideshow />
                <div className={url === '/quick-cms/public/' ? '' : "animate__animated animate__slideInLeft"}>
                    {children}
                </div>
                <Footer />
            </main>
        </>
    );
}

export default FrontLayout;