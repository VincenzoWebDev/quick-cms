import Copyright from "@/components/Front/Copyright";
import Carousel from "@/components/Front/Carousel";
import Topbar from "@/components/Front/Topbar";
import { useEffect } from "react";
import 'animate.css';

const FrontLayout = ({ children, pages }) => {
    useEffect(() => {
        document.documentElement.style.setProperty('--animate-duration', '0.7s');
    }, []);

    return (
        <>
            <Topbar pages={pages} />
            <main className="animate__animated animate__fadeInLeft">
                <Carousel />
                <div className="container">
                    {children}
                </div>
                <Copyright />
            </main>
        </>
    );
}

export default FrontLayout;