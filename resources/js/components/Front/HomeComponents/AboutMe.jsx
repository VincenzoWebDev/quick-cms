import aboutImg from '@/../../public/themes/quick_cms/img/about-me.png';
import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

const AboutMe = () => {
    useEffect(() => {
        // Inizializza ScrollReveal
        ScrollReveal().reveal('.about', {
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
            <div className="container container-about about">
                <div className="row align-items-center">
                    <div className="col-md-5 col-lg-5">
                        <img src={aboutImg} alt="" className="img-fluid" />
                    </div>
                    <div className="col-md-7 col-lg-7 p-5">
                        <h4 className='text-red'>About Me</h4>
                        <h2 className='my-4'>Vincenzo De Leonardis<br />Web designer & Web developer</h2>
                        <p className='text-about'>Sono <span className='text-red'>Vincenzo De Leonardis</span>, un appassionato web designer e sviluppatore web.
                            Unisco creatività e tecnologia per creare esperienze digitali coinvolgenti.
                            <br />
                            La mia missione è trasformare idee in siti web funzionali e esteticamente sorprendenti.
                            Guidato dalla curiosità e dalla ricerca continua di soluzioni innovative, offro esperienze utente intuitive e gratificanti.
                            <br />
                            <br />
                            Inoltre, sono il creatore di "<span className='text-red'>Quick CMS</span>", un progetto che semplifica la gestione dei contenuti web, offrendo un'esperienza di editing fluida e intuitiva per gli utenti.
                            Esplora il mio lavoro e scopri come posso portare la tua visione online alla vita.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutMe