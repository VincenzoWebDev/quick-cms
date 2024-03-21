import FrontLayout from "@/Layouts/FrontLayout";
import AboutMe from "@/components/Front/HomeComponents/AboutMe";
import Cards from "@/components/Front/HomeComponents/Cards";
import MyProject from "@/components/Front/HomeComponents/MyProject";
import Technologies from "@/components/Front/HomeComponents/Technologies";
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