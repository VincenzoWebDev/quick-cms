import React from "react";
import { PageContent } from "@/components/Front/Index";
import FrontLayout from "@/Layouts/FrontLayout";

const Page = ({ currentPage, pageLayout, pages }) => {
    return (
        <FrontLayout pages={pages}>
            <PageContent currentPage={currentPage} pageLayout={pageLayout}></PageContent>
        </FrontLayout>
    )
}

export default Page;