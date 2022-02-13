import React, { useEffect, useState } from "react";
import Banner from "../components/Banner.component";
import CareersItem from "../components/CareersItem.component";
import { url } from "../URL";
import Seo from "../components/Seo.component";

const Careers = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  //get portfolio items on load
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();

    fetch(url + "/vacancy", {
      method: "GET",
      signal: abortController.signal,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) return 0;
        setVacancies(data.vacancies);
        setLoading(false);
      });

    return () => abortController.abort();
  }, []);

  if (loading) {
    return (
      <div className="loader-container-specify">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <>
        <Seo
          title="Careers - Zpro"
          description="Zpro is a company specializing in the IT sector. We are hard working, creative and passionate in the field of website design, development and software development. We also include services like logo design and website redesign. We will help you grow your business digitally.
      Zpro is well-established and trusted IT company for high quality services with modern and custom design for reasonable cost and with high efficiency. We try our best to make our clients happy and satisfy with our creations."
        />
        <Banner text1="Looking For" text2="Motivated and Creative People" />
        <CareersItem data={vacancies} />
      </>
    );
  }
};

export default Careers;
