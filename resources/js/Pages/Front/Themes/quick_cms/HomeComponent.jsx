import FrontLayout from "@/Layouts/FrontLayout";
import { AboutMe, Cards, MyProject, Technologies } from "@/components/Front/Index";
import React from "react";

const HomeComponent = ({ pages }) => {

    return (
        <FrontLayout pages={pages}>
            <AboutMe />
            <Technologies />
            <MyProject />
            <Cards />
        </FrontLayout>
    )
}

export default HomeComponent;