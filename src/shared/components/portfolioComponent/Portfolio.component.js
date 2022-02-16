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
        title="Portfolio - Zpro"
        description="Zpro is a company specializing in the IT sector. We are hard working, creative and passionate in the field of website design, development and software development. We also include services like logo design and website redesign. We will help you grow your business digitally.
      Zpro is well-established and trusted IT company for high quality services with modern and custom design for reasonable cost and with high efficiency. We try our best to make our clients happy and satisfy with our creations."
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
