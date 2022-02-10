import React, { useEffect, useState } from "react";
import Banner from "../components/Banner.component";
import CareersItem from "../components/CareersItem.component";
import { url } from "../URL";

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
        <Banner text1="Looking For" text2="Motivated and Creative People" />
        <CareersItem data={vacancies} />
      </>
    );
  }
};

export default Careers;
