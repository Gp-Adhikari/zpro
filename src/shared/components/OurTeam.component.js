import React from "react";
import gpPhoto from "../img/gp.png";
import subarnPhoto from "../img/subarn.png";
import birendraPhoto from "../img/birendra.png";
import bishalPhoto from "../img/bishal.png";
import OurTeamCard from "./OurTeamCard.component";

const OurTeam = () => {
  return (
    <>
      <div className="ourTeamContainer">
        <OurTeamCard
          name="GP Adhikari"
          position="Founder/CEO &amp; Full Stack Developer"
          img={gpPhoto}
        />
        <OurTeamCard
          name="Birendra Dewal"
          position="FrontEnd Developer"
          img={birendraPhoto}
        />
        <OurTeamCard
          name="Bishal Sukubhatu"
          position="FrontEnd Developer"
          img={bishalPhoto}
        />
        <OurTeamCard
          name="GP Adhikari"
          position="Founder &amp; CEO"
          img={subarnPhoto}
        />
        <OurTeamCard
          name="GP Adhikari"
          position="Founder &amp; CEO"
          img={subarnPhoto}
        />
      </div>
    </>
  );
};

export default OurTeam;
