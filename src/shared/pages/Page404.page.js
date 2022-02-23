import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo.component";

const Page404 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 10000);
  }, [navigate]);

  return (
    <>
      <Seo
        title="PageNotFound - Zprofs"
        description="Zprofs is a company specializing in the IT sector. We are hard working, creative and passionate in the field of website design, development and software development. We also include services like logo design and website redesign. We will help you grow your business digitally.
      Zprofs is well-established and trusted IT company for high quality services with modern and custom design for reasonable cost and with high efficiency. We try our best to make our clients happy and satisfy with our creations."
      />
      <div className="container-404">
        <h1>404 - Page Not Found.</h1>
        <button type="button" onClick={() => navigate("/")}>
          Back To Home Page
        </button>
      </div>
    </>
  );
};

export default Page404;
