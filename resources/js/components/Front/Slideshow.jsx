import { useEffect, useState } from 'react';
import SlideshowCaption from './SlideshowCaption';
import img4 from '@/../../public/themes/quick_cms/img/slider/slider-4.jpg';
import img5 from '@/../../public/themes/quick_cms/img/slider/slider-dev.png';
import video2 from '@/../../public/themes/quick_cms/video/vid-2.mp4';


import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/src/styled/open-animation/open-animation.scss';


const Slideshow = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const setSliderHeight = () => {
            const slider = document.querySelector('.slider');
            if (slider) {
                const windowHeight = window.innerHeight;
                slider.style.height = `${windowHeight}px`;
            }
        };

        setSliderHeight();
        window.addEventListener('resize', setSliderHeight);

        return () => {
            window.removeEventListener('resize', setSliderHeight);
        };
    }, []);

    useEffect(() => {
        const videoEl = document.querySelector('[data-video="loop-video"]>video');
        const setVideo = () => {
            if (videoEl) {
                videoEl.loop = true;
                videoEl.autoplay = true;
                videoEl.muted = true;
                videoEl.controls = false;

                videoEl.addEventListener('canplay', () => {
                    videoEl.play().catch(error => {
                        // Gestisci l'errore se l'autoplay non è riuscito
                        console.error('Autoplay failed:', error);
                    });
                });
            }
        }
        setVideo();
    }, [slideIndex]);

    return (
        <>
            <AwesomeSlider
                className='slider'
                bullets={false}
                animation='openAnimation'
                onTransitionEnd={({ currentIndex }) => setSlideIndex(currentIndex)}>
                <div data-src={video2} className='slider-title' data-video='loop-video'>
                    <SlideshowCaption title="Vincenzo Designer" testo="Web Designer / Web Developer" />
                </div>
                <div data-src={img4} className='slider-title d-flex'>
                    <SlideshowCaption title="Quick CMS" testo="Scopri il mio progetto" />
                    <img src={img5} className='img-fluid slider-dev ms-5' width={400} alt="slider-dev" />
                </div>
            </AwesomeSlider>
        </>
    )
}

export default Slideshow;