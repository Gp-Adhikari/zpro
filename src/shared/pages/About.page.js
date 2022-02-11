import React from "react";
import Title from "../components/Title.component";
import OurTeam from "../components/OurTeam.component";
import AboutUs from "../components/AboutUs.component";
import Banner from "../components/Banner.component";
import Seo from "../components/Seo.component";

const About = () => {
  return (
    <>
      <Seo
        title="About - Zpro"
        description="Zpro is a company specializing in the IT sector. We are hard working, creative and passionate in the field of website design, development and software development. We also include services like logo design and website redesign. We will help you grow your business digitally.
      Zpro is well-established and trusted IT company for high quality services with modern and custom design for reasonable cost and with high efficiency. We try our best to make our clients happy and satisfy with our creations."
      />
      <Banner text1="About Us" />
      <AboutUs />
      <Title TitleText="Our Team" />
      <OurTeam />
    </>
  );
};

export default About;
