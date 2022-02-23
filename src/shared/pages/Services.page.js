import React from "react";
import Banner from "../components/Banner.component";
import Title from "../components/Title.component";
import WhatWeDo from "../components/WhatWeDo/WhatWeDo.component";
import WhatWeUse from "../components/WhatWeUse.component";
import Seo from "../components/Seo.component";

const Services = () => {
  return (
    <>
      <Seo
        title="Services - Zprofs"
        description="Our Mission is to design and customize your business platform. We provide services like web development, domain hosting, seo, content writing, web redesign and also logo design."
      />
      <Banner text1="Services At" text2="Zprofs" />
      <Title TitleText="What We Do?" />
      <WhatWeDo />
      <Title TitleText="What We Use?" />
      <WhatWeUse />
    </>
  );
};

export default Services;
