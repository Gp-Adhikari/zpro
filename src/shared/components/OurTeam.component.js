import React from "react";
import gpPhoto from "../img/gp.png";
import birendraPhoto from "../img/birendra.png";
import bishalPhoto from "../img/bishal.png";
import archanaPhoto from "../img/archana.png";
import parbatiPhoto from "../img/parbati.png";
import kabitaPhoto from "../img/kabita.png";
import OurTeamCard from "./OurTeamCard.component";

const OurTeam = () => {
  return (
    <>
      <div className="ourTeamContainer">
        <OurTeamCard
          name="GP Adhikari"
          position="CEO / Founder / Senior Back-End Developer / Designer"
          img={gpPhoto}
        />
        <OurTeamCard
          name="Birendra Dewal"
          position="Instructor / Senior Developer"
          img={birendraPhoto}
        />
        <OurTeamCard
          name="Archana Makaju"
          position="FrontEnd Developer"
          img={archanaPhoto}
        />
        <OurTeamCard
          name="Parbati Manandhar"
          position="FrontEnd Developer"
          img={parbatiPhoto}
        />
        <OurTeamCard
          name="Bishal Sukubhatu"
          position="FrontEnd Developer"
          img={bishalPhoto}
        />
        <OurTeamCard
          name="Kabita Buyo"
          position="FrontEnd Developer"
          img={kabitaPhoto}
        />
      </div>
    </>
  );
};

export default OurTeam;
