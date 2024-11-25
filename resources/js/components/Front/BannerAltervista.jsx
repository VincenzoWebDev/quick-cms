import React, { useEffect } from 'react';

const BannerAltervista = () => {
    useEffect(() => {
        const script = document.createElement("script");
        const altervista = document.getElementById("altervista-banner");
        script.src = "//ad.altervista.org/js.ad/size=300X250/?ref=" + encodeURIComponent(window.location) + "&r=" + Date.now();
        altervista.appendChild(script);
        return () => {
            altervista.removeChild(script);
        };
    }, []);

    return (
        <div id="altervista-banner" className='text-center'></div>
    );
};

export default BannerAltervista;