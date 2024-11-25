import React from "react";
import { useState, useEffect } from "react";
import ScrollReveal from 'scrollreveal';

const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}`;
}
const Footer = () => {
    const [currentDate, setCurrentDate] = useState(getDate());

    useEffect(() => {
        // Inizializza ScrollReveal
        ScrollReveal().reveal('.cont-icons', {
            duration: 1000,
            easing: 'ease-out',
            distance: '50px',
            origin: 'top',
            reset: true,
            scale: 0.9,
            viewFactor: 0.2,
        });
    }, []);

    return (
        <>
            <div className="container-footer">
                <footer className="text-center text-white">
                    <div className="container py-5 cont-icons">
                        <h2 className="mb-5">Seguimi su:</h2>

                        {/* <a className="icon m-2" href="#!" role="button" target="_blank">
                                <i className="fab fa-facebook-f"></i>
                            </a> */}

                        {/* <a className="icon m-2" href="#!" role="button" target="_blank">
                                <i className="fab fa-twitter"></i>
                            </a> */}

                        {/* <a className="icon m-2" href="#!" role="button" target="_blank">
                                <i className="fab fa-google"></i>
                            </a> */}

                        <a className="icon m-2" href={'https://www.instagram.com/vincenzo.web.dev/'} role="button" target="_blank">
                            <i className="fab fa-instagram"></i>
                        </a>

                        <a className="icon m-2" href={'https://www.linkedin.com/in/vincenzo-de-leonardis-2086972ba/'} role="button" target="_blank">
                            <i className="fab fa-linkedin-in"></i>
                        </a>

                        <a className="icon m-2" href={'https://github.com/VincenzoWebDev'} role="button" target="_blank">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                    <div className="text-center p-3 copyright">
                        <span>&copy; {currentDate} Copyright - Vincenzo Designer</span>
                        <br />
                        <a href="https://www.iubenda.com/privacy-policy/61787884" rel="noreferrer nofollow" target="_blank">Privacy Policy</a>
                        - <a href="#" role="button" className="iubenda-advertising-preferences-link">Personalizza tracciamento pubblicitario</a>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer