import React from "react";

const PortfolioImage = ({ img, title, link }) => {
  return (
    <>
      <div className="portfolio-image-imgCard">
        <img
          src={img}
          alt="images"
          className="portfolio-image-imgCard-skeleton"
        />
        <div className="portfolioDesc">
          <h4>{title}</h4>
          <p>{link}</p>
        </div>
      </div>
    </>
  );
};
export default PortfolioImage;
