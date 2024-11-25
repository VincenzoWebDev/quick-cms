import React, { useEffect } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Copyright, Footer, Header, MainBanner, OffcanvasCart, OffcanvasNavbar, Preloader } from "@/components/Themes/QuickEcommerce/Index";
import 'animate.css';
import { Head, usePage } from "@inertiajs/react";

const EcommerceLayout = ({ children, seo_metadata }) => {
    useEffect(() => {
        document.documentElement.style.setProperty('--animate-duration', '0.5s');
    }, []);
    const { seo_defaults } = usePage().props;
    return (
        <>
            {/* <Preloader /> */}
            <Head>
                <title>{seo_metadata?.meta_title || `${seo_defaults.site_name}`}</title>
                <meta name="description" content={seo_metadata?.meta_description || seo_defaults.site_description} />
                <meta name="keywords" content={seo_metadata?.meta_keywords || ''} />
                <link rel="canonical" href={seo_metadata?.canonical_url || window.location.href} />

                {/* Open Graph */}
                <meta property="og:title" content={seo_metadata?.og_title || seo_defaults.site_name} />
                <meta property="og:description" content={seo_metadata?.og_description || seo_defaults.site_description} />
                <meta property="og:image" content={seo_metadata?.og_image || seo_defaults.default_image} />

                {/* Twitter */}
                <meta name="twitter:title" content={seo_metadata?.twitter_title || seo_defaults.site_name} />
                <meta name="twitter:description" content={seo_metadata?.twitter_description || seo_defaults.site_description} />
                <meta name="twitter:image" content={seo_metadata?.twitter_image || seo_defaults.default_image} />
            </Head>
            <OffcanvasCart />
            <OffcanvasNavbar />
            <Header />
            <MainBanner />
            <main className="animate__animated animate__fadeIn py-5 bg-light" >
                {children}
            </main>
            <Footer />
            <Copyright />
        </>
    );
}

export default EcommerceLayout;