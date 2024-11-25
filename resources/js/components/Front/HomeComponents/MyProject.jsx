import myprojectImg from '@/../../public/themes/quick_cms/img/my-project.png';
import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

const MyProject = () => {
    useEffect(() => {
        // Inizializza ScrollReveal
        ScrollReveal().reveal('.project', {
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
            <div className="container container-project project text-end">
                <div className="row align-items-center">
                    <div className="col-md-7 col-lg-7 p-5">
                        <h4 className='text-red'>Il mio progetto</h4>
                        <h2 className='my-4'>Quick CMS<br />Sistema di gestione dei contenuti</h2>
                        <p className='text-project'>
                            <span className='text-red'>Quick CMS</span> è una piattaforma in continua evoluzione che offre un'efficiente gestione degli utenti con autenticazione sicura.
                            Consente la creazione di album fotografici con categorie personalizzabili e un'interfaccia intuitiva per caricare le immagini.
                            Inoltre, supporta la gestione dinamica delle pagine per un front end dinamico e coinvolgente, garantendo un'esperienza utente ottimale.
                        </p>
                    </div>
                    <div className="col-md-5 col-lg-5">
                        <img src={myprojectImg} alt="" className="img-fluid" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProject