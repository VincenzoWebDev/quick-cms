import FrontLayout from "@/Layouts/FrontLayout";
import { AboutMe, Cards, MyProject, Technologies } from "@/components/Front";
import React from "react";

const Home = ({ pages }) => {

    return (
        <FrontLayout pages={pages}>
            <AboutMe />
            <Technologies />
            <MyProject />
            <Cards />
        </FrontLayout>
    )
}

export default Home;