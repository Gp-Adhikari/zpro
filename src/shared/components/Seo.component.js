import React from "react";
import { Helmet } from "react-helmet";
import logo from "../img/logo.svg";

const Seo = ({ title, description }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${title}`}</title>
        <meta name="description" content={`${description}`} />
        <link rel="icon" href={logo} />
      </Helmet>
    </div>
  );
};

export default Seo;
