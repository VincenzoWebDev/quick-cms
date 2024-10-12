import { useEffect } from 'react';
import SlideshowCaption from './SlideshowCaption';
import img2 from '@/../../public/themes/quick_cms/img/slider/slider-2.jpg';
import img3 from '@/../../public/themes/quick_cms/img/slider/slider-3.jpg';
import img4 from '@/../../public/themes/quick_cms/img/slider/slider-4.jpg';
import sliderDev from '@/../../public/themes/quick_cms/img/slider/slider-dev.png';
import sostSlide from '@/../../public/themes/quick_cms/img/slider/slider-1.jpg';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/src/styled/open-animation/open-animation.scss';
import { usePage } from '@inertiajs/react';


const Slideshow = () => {
    const { url } = usePage();

    useEffect(() => {
        const setSliderHeight = () => {
            const slider = document.querySelector('.slider');
            const awssld = document.querySelector('.awssld__container');
            if (url === '/quick-cms/public/') {
                if (slider) {
                    const windowHeight = window.innerHeight;
                    slider.style.height = `${windowHeight}px`;
                    awssld.style.paddingBottom = '50%';
                }
            } else {
                if (slider) {
                    const windowHeight = 150;
                    slider.style.height = `${windowHeight}px`;
                    awssld.style.paddingBottom = '15%';
                }
            }
        };

        setSliderHeight();
        window.addEventListener('resize', setSliderHeight);

        return () => {
            window.removeEventListener('resize', setSliderHeight);
        };
    }, []);

    return (
        <>
            {url === '/quick-cms/public/' ? (
                <AwesomeSlider
                    className='slider'
                    bullets={false}
                    animation='openAnimation'>
                    <div data-src={img2} className='slider-title'>
                        <SlideshowCaption title="Quick CMS" testo="Scopri il mio progetto" />
                    </div>
                    <div data-src={img3} className='slider-title'>
                        <SlideshowCaption title="Quick CMS" testo="Scopri il mio progetto" />
                    </div>
                    <div data-src={img4} className='slider-title d-flex'>
                        <SlideshowCaption title="Quick CMS" testo="Scopri il mio progetto" />
                        <img src={sliderDev} className='img-fluid slider-dev ms-5' width={400} alt="slider-dev" />
                    </div>
                </AwesomeSlider>
            ) : (
                <AwesomeSlider
                    className='slider'
                    bullets={false}
                    buttons={false}
                    animation='openAnimation'>
                    <div data-src={sostSlide} className='slider-title'>
                        <></>
                    </div>
                </AwesomeSlider>
            )}
        </>
    )
}

export default Slideshow;