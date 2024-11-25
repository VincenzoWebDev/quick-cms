import React, { useEffect } from "react";
import {
    BestSellingProducts, CategorySection, BannerSection, FeaturedProducts, NewsletterBanner,
    LatestProducts, PeoplesLooking, FeaturesSection,
} from "@/components/Themes/QuickEcommerce/Index";
import EcommerceLayout from "@/Layouts/EcommerceLayout";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeComponent = ({ products }) => {
    useEffect(() => {
        AOS.init(
            {
                duration: 500,
                easing: 'ease-in-out',
                once: true,
                mirror: true,
            }
        );
    }, [])

    return (
        <EcommerceLayout>
            <CategorySection />
            <BestSellingProducts products={products} />
            <BannerSection />
            <FeaturedProducts products={products} />
            <NewsletterBanner />
            <LatestProducts />
            <PeoplesLooking />
            <FeaturesSection />
        </EcommerceLayout>
    )
}

export default HomeComponent;
