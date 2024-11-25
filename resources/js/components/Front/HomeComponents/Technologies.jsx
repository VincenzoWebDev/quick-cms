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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Technologies = () => {
    const settings = {
        slidesToShow: 8,
        slidesToScroll: 2,
        autoplaySpeed: 2000,
        arrows: true,
        autoplay: true,
        infinite: true,
        speed: 1000,
        pauseOnFocus: true,
        pauseOnHover: true,
        dots: false,
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
    };

    return (
        <>
            <div className="container-technologies py-5">
                <h2 className='text-center mb-5'>Tecnologie utilizzate</h2>
                <Slider {...settings} className='text-center'>
                    <div className="img-container">
                        <img src={htmlIcon} className="img-fluid technology-icon" alt="Html" />
                        <span>HTML</span>
                    </div>
                    <div className="img-container">
                        <img src={cssIcon} className="img-fluid technology-icon" alt="Css" />
                        <span>CSS</span>
                    </div>
                    <div className="img-container">
                        <img src={jsIcon} className="img-fluid technology-icon" alt="Js" />
                        <span>JavaScript</span>
                    </div>
                    <div className="img-container">
                        <img src={reactIcon} className="img-fluid technology-icon" alt="React" />
                        <span>React</span>
                    </div>
                    <div className="img-container">
                        <img src={jqueryIcon} className="img-fluid technology-icon" alt="JQuery" />
                        <span>JQuery</span>
                    </div>
                    <div className="img-container">
                        <img src={bootstrapIcon} className="img-fluid technology-icon" alt="Bootstrap" />
                        <span>Bootstrap</span>
                    </div>
                    <div className="img-container">
                        <img src={phpIcon} className="img-fluid technology-icon" alt="Php" />
                        <span>PHP</span>
                    </div>
                    <div className="img-container">
                        <img src={laravelIcon} className="img-fluid technology-icon" alt="Laravel" />
                        <span>Laravel</span>
                    </div>
                    <div className="img-container">
                        <img src={mysqlIcon} className="img-fluid technology-icon" alt="MySQL" />
                        <span>MySQL</span>
                    </div>
                    <div className="img-container">
                        <img src={psIcon} className="img-fluid technology-icon" alt="Photoshop" />
                        <span>Photoshop</span>
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default Technologies