import React from "react";
import {
    BestSellingProducts, CategorySection, BannerSection, FeaturedProducts, NewsletterBanner,
    LatestProducts, PeoplesLooking, FeaturesSection,
} from "@/components/Themes/QuickEcommerce/Index";
import EcommerceLayout from "@/Layouts/EcommerceLayout";

const HomeComponent = ({ products }) => {
    return (
        <EcommerceLayout>
            <CategorySection />
            <BestSellingProducts products={products} />
            <BannerSection />
            <FeaturedProducts products={products} />
            <NewsletterBanner />
            <LatestProducts products={products} />
            <PeoplesLooking />
            <FeaturesSection />
        </EcommerceLayout>
    )
}

export default HomeComponent;
