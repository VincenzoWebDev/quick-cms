import React, { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {
  Copyright,
  Footer,
  Header,
  MainBanner,
  OffcanvasCart,
  OffcanvasNavbar,
  Preloader,
} from '@/components/Themes/QuickEcommerce/Index';
import 'animate.css';
import { Head, usePage } from '@inertiajs/react';
import DemoModeBanner from '@/components/DemoModeBanner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../css/quick_ecommerce/app.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EcommerceLayout = ({ children, seo_metadata }) => {
  const page = usePage();
  const { seo_defaults, demo_mode } = page.props;
  const appUrl = import.meta.env.VITE_APP_URL ? import.meta.env.VITE_APP_URL.replace(/\/$/, '') : '';
  const canonicalUrl = seo_metadata?.canonical_url || (appUrl ? `${appUrl}${page.url}` : page.url);
  useEffect(() => {
    document.documentElement.style.setProperty('--animate-duration', '0.5s');
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [page.url]);

  return (
    <>
      {/* <Preloader /> */}
      <Head>
        <title>{seo_metadata?.meta_title || `${seo_defaults.site_name}`}</title>
        <meta name="description" content={seo_metadata?.meta_description || seo_defaults.site_description} />
        <meta name="keywords" content={seo_metadata?.meta_keywords || ''} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={seo_metadata?.og_title || seo_defaults.site_name} />
        <meta property="og:description" content={seo_metadata?.og_description || seo_defaults.site_description} />
        <meta property="og:image" content={seo_metadata?.og_image || seo_defaults.default_image} />

        {/* Twitter */}
        <meta name="twitter:title" content={seo_metadata?.twitter_title || seo_defaults.site_name} />
        <meta name="twitter:description" content={seo_metadata?.twitter_description || seo_defaults.site_description} />
        <meta name="twitter:image" content={seo_metadata?.twitter_image || seo_defaults.default_image} />
      </Head>
      {Number(demo_mode) === 1 && <DemoModeBanner />}
      <OffcanvasCart />
      <OffcanvasNavbar />
      <Header />
      <MainBanner />
      <main className="animate__animated animate__fadeIn py-5 bg-light">{children}</main>
      <ToastContainer position="top-center" style={{ marginTop: '96px' }} />
      <Footer />
      <Copyright />
    </>
  );
};

export default EcommerceLayout;
