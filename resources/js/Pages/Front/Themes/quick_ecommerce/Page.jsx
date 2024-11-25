import React from "react";
import EcommerceLayout from "@/Layouts/EcommerceLayout";
import { PageContent } from "@/components/Front/Index";

const Page = ({ currentPage, pageLayout }) => {
    return (
        <EcommerceLayout>
            <PageContent currentPage={currentPage} pageLayout={pageLayout}></PageContent>
        </EcommerceLayout>
    )
}

export default Page;