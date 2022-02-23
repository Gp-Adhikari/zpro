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
        title="About - Zprofs"
        description="We provide creative, secure and bug-free websites for you at reasonable cost. Our company has reliableexperts, such IT Engineers, Developers, Designers, and more. We work hard for best quality designs. We are your best partner and will help with brilliant, passionate and hard-working team members. We provide with first class service and deliver quality outputs. We work to the highest of standards in providing the best quality."
      />
      <Banner text1="About Us" />
      <AboutUs />
      <Title TitleText="Our Team" />
      <OurTeam />
    </>
  );
};

export default About;
