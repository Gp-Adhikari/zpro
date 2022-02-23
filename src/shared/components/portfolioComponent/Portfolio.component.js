import React, { useState, useEffect } from "react";
import { url } from "../../URL";
import Banner from "../Banner.component";
import Title from "../Title.component";
import PortfolioImage from "./portfolioimage.component";
import Seo from "../Seo.component";

const Portfolio = () => {
  const [route, setRoute] = useState("");
  useEffect(() => {}, [route]);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  //get portfolio items on load
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();

    fetch(url + "/portfolio", {
      method: "GET",
      signal: abortController.signal,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) return 0;
        setPortfolios(data.portfolios);
        setLoading(false);
      });

    return () => abortController.abort();
  }, []);

  return (
    <>
      <Seo
        title="Portfolio - Zprofs"
        description="We use the latest technology and tools. Our portfolio contains softwares/websites, designs made by the modern technology and tools."
      />
      <Banner text1="Our Recent" text2="Project" />
      <div className="portfolio">
        <Title TitleText="Portfolio" />
        <div className="navBar">
          <ul type="none">
            <li
              onClick={() => {
                setRoute("");
              }}
              className={route === "" ? "active" : null}
            >
              All
            </li>
            <li
              onClick={() => {
                setRoute("web");
              }}
              className={route === "web" ? "active" : null}
            >
              Web Design
            </li>
            <li
              onClick={() => {
                setRoute("logo");
              }}
              className={route === "logo" ? "active" : null}
            >
              Logo Design
            </li>
            <li
              onClick={() => {
                setRoute("mockup");
              }}
              className={route === "mockup" ? "active" : null}
            >
              Mock Up
            </li>
          </ul>
        </div>
        {loading ? (
          <div className="loader-container-specify">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="portfolioContainer">
            {route === "" && portfolios[0] !== undefined ? (
              portfolios.map((portfolio) => (
                <PortfolioImage
                  key={portfolio._id}
                  img={`${url}/photo/${portfolio.img.split(".jpeg")[0]}`}
                  title={portfolio.name}
                  link={portfolio.link}
                />
              ))
            ) : route === "web" && portfolios[0] !== undefined ? (
              portfolios.map((portfolio) =>
                parseInt(portfolio.type) === 1 ? (
                  <PortfolioImage
                    key={portfolio._id}
                    img={`${url}/photo/${portfolio.img.split(".jpeg")[0]}`}
                    title={portfolio.name}
                    link={portfolio.link}
                  />
                ) : null
              )
            ) : route === "logo" && portfolios[0] !== undefined ? (
              portfolios.map((portfolio) =>
                parseInt(portfolio.type) === 3 ? (
                  <PortfolioImage
                    key={portfolio._id}
                    img={`${url}/photo/${portfolio.img.split(".jpeg")[0]}`}
                    title={portfolio.name}
                    link={portfolio.link}
                  />
                ) : null
              )
            ) : route === "mockup" && portfolios[0] !== undefined ? (
              portfolios.map((portfolio) =>
                parseInt(portfolio.type) === 2 ? (
                  <PortfolioImage
                    key={portfolio._id}
                    img={`${url}/photo/${portfolio.img.split(".jpeg")[0]}`}
                    title={portfolio.name}
                    link={portfolio.link}
                  />
                ) : null
              )
            ) : (
              <p className="not-available">No Data Found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Portfolio;
