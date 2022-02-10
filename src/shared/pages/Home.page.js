import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection.component";
import Seo from "../components/Seo.component";
import Introduction from "../components/Introduction.component";
import WhatWeDo from "../components/WhatWeDo/WhatWeDo.component";
import RecentProjects from "../components/RecentProjects.component";
import Title from "../components/Title.component";

import confetti from "canvas-confetti";
import { url } from "../URL";

const Home = () => {
  //confetti for this page
  useEffect(() => {
    let duration = 2 * 1000;
    let animationEnd = Date.now() + duration;
    let skew = 1;

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    (function frame() {
      let timeLeft = animationEnd - Date.now();
      let ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: Math.random() * skew - 0.2,
        },
        colors: ["#ffffff"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();
  });
  return (
    <>
      <Seo
        title="Home - Zpro"
        description="Zpro is a company specializing in the IT sector. We are hard working, creative and passionate in the field of website design, development and software development. We also include services like logo design and website redesign. We will help you grow your business digitally.

      Zpro is well-established and trusted IT company for high quality services with modern and custom design for reasonable cost and with high efficiency. We try our best to make our clients happy and satisfy with our creations."
      />
      <HeroSection />
      <Introduction />
      <Title TitleText="What We Do?" />
      <WhatWeDo />
      <Title TitleText="Recent Projects" />
      <RecentProjects />
    </>
  );
};

export default Home;
