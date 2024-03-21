import htmlIcon from '@/../../public/themes/quick_cms/img/icons/html-icon.png'
import cssIcon from '@/../../public/themes/quick_cms/img/icons/css-icon.png'
import jsIcon from '@/../../public/themes/quick_cms/img/icons/js-icon.png'
import reactIcon from '@/../../public/themes/quick_cms/img/icons/react-icon.png'
import psIcon from '@/../../public/themes/quick_cms/img/icons/ps-icon.png'
import bootstrapIcon from '@/../../public/themes/quick_cms/img/icons/bootstrap-icon.png'
import phpIcon from '@/../../public/themes/quick_cms/img/icons/php-icon.png'
import laravelIcon from '@/../../public/themes/quick_cms/img/icons/laravel-icon.png'
import jqueryIcon from '@/../../public/themes/quick_cms/img/icons/jquery-icon.png'
import mysqlIcon from '@/../../public/themes/quick_cms/img/icons/mysql-icon.png'
import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import $ from 'jquery';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Technologies = () => {
    useEffect(() => {
        $('.logo-carousel').not('.slick-initialized').slick({
            slidesToShow: 8,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1000,
            arrows: true,
            dots: false,
            pauseOnHover: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 6
                    }
                },
                {
                    breakpoint: 520,
                    settings: {
                        slidesToShow: 4
                    }
                }
            ]
        });
    }, []);

    return (
        <>
            <div className="container-technologies py-5">
                <h2 className='text-center mb-5'>Tecnologie utilizzate</h2>
                <div className="row text-center logo-carousel slider">
                    <div className='col'>
                        <div className="img-container slide">
                            <img src={htmlIcon} className="img-fluid technology-icon" alt="Html" />
                        </div>
                        <span>HTML</span>
                    </div>
                    <div className='col'>
                        <div className="img-container slide">
                            <img src={cssIcon} className="img-fluid technology-icon" alt="Css" />
                        </div>
                        <span>CSS</span>
                    </div>
                    <div className='col'>
                        <div className="img-container slide">
                            <img src={jsIcon} className="img-fluid technology-icon" alt="Js" />
                        </div>
                        <span>JavaScript</span>
                    </div>
                    <div className='col'>
                        <div className="img-container slide">
                            <img src={reactIcon} className="img-fluid technology-icon" alt="React" />
                        </div>
                        <span>React</span>
                    </div>
                    <div className='col'>
                        <div className="img-container slide">
                            <img src={jqueryIcon} className="img-fluid technology-icon" alt="JQuery" />
                        </div>
                        <span>JQuery</span>
                    </div>
                    <div className='col'>
                        <div className="img-container slide">
                            <img src={bootstrapIcon} className="img-fluid technology-icon" alt="Bootstrap" />
                        </div>
                        <span>Bootstrap</span>
                    </div>
                    <div className='col'>
                        <div className="img-container slide">
                            <img src={phpIcon} className="img-fluid technology-icon" alt="Php" />
                        </div>
                        <span>PHP</span>
                    </div>
                    <div className='col'>
                        <div className="img-container slide">
                            <img src={laravelIcon} className="img-fluid technology-icon" alt="Laravel" />
                        </div>
                        <span>Laravel</span>
                    </div>
                    <div className='col'>
                        <div className="img-container slide">
                            <img src={mysqlIcon} className="img-fluid technology-icon" alt="MySQL" />
                        </div>
                        <span>MySQL</span>
                    </div>
                    <div className='col'>
                        <div className="img-container slide">
                            <img src={psIcon} className="img-fluid technology-icon" alt="Photoshop" />
                        </div>
                        <span>Photoshop</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Technologies