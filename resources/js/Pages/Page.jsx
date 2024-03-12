import React from "react";
import PageComponent from "@/components/Front/PageComponent";
import FrontLayout from "@/Layouts/FrontLayout";

const Page = ({ currentPage, pages }) => {
    return (
        <FrontLayout pages={pages}>
            <PageComponent currentPage={currentPage}></PageComponent>
        </FrontLayout>
    )
}

export default Page;