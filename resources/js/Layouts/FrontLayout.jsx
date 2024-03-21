import Copyright from "@/components/Front/Copyright";
import Topbar from "@/components/Front/Topbar";
import Slideshow from "@/components/Front/Slideshow";
import { useEffect } from "react";
import Footer from "@/components/Front/Footer";

const FrontLayout = ({ children, pages }) => {
    useEffect(() => {
        document.documentElement.style.setProperty('--animate-duration', '0.7s');
    }, []);

    return (
        <>
            <Topbar pages={pages} />
            <main>
                <Slideshow />
                {children}
                <Footer />
            </main>
        </>
    );
}

export default FrontLayout;