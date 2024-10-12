import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

const Cards = () => {
    useEffect(() => {
        // Inizializza ScrollReveal
        ScrollReveal().reveal('.cards', {
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
            <div className='container-cards py-5'>
                <div className="container h-100 cards">
                    <div className="row align-middle">
                        <h2 className="text-center mb-5">Cosa faccio</h2>
                        <div className="col-md-4 col-lg-4 card-column">
                            <div className="card-home gr-1">
                                <div className="txt">
                                    <h1>WEB DESIGN</h1>
                                    <p>Visual communication and problem-solving</p>
                                </div>
                                <a href="#">Scopri</a>
                                {/* <div className="ico-card">
                                    <i className="fa-solid fa-palette"></i>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 card-column">
                            <div className="card-home gr-2">
                                <div className="txt">
                                    <h1>WEB DEVELOPER</h1>
                                    <p>How design is implemented on the web.</p>
                                </div>
                                <a href="#">Scopri</a>
                                {/* <div className="ico-card">
                                    <i className="fa-solid fa-code"></i>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 card-column">
                            <div className="card-home gr-3">
                                <div className="txt">
                                    <h1>UI & UX</h1>
                                    <p>User Interface and User Experience Design.</p>
                                </div>
                                <a href="#">Scopri</a>
                                {/* <div className="ico-card">
                                    <i className="fa-solid fa-users"></i>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cards