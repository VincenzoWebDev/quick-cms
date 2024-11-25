import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Aggiungi la classe al caricamento
        document.body.classList.add('preloader-site');

        const timeoutId = setTimeout(() => {
            setLoading(false); // Nasconde il preloader dopo 1 secondo
        }, 100); // Puoi regolare questo valore

        // Nascondi il preloader quando la finestra è caricata
        const handleLoad = () => {
            clearTimeout(timeoutId);
            setLoading(false);
        };

        window.addEventListener('load', handleLoad);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('load', handleLoad);
            document.body.classList.remove('preloader-site');
        };
    }, []);

    return (
        loading && (
            <div className="preloader-wrapper">
                <div className="preloader"></div>
            </div>
        )
    );
};

export default Preloader;
