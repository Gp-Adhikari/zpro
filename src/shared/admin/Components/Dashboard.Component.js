import React, { useEffect, useContext, useState } from "react";
import AdminTitle from "./AdminTitle.Component";
import BarChart from "./BarChart.Component";
import increaseIcon from "../img/increaseArrow.svg";
import decreaseIcon from "../img/decreaseArrow.svg";

import { TokenContext } from "../../Contexts/TokenContext";
import { url } from "../../URL";
import Seo from "../../components/Seo.component";

const Dashboard = () => {
  const { token, csrfToken, setLoading } = useContext(TokenContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const abortController2 = new AbortController();

    fetch(url + "/token", {
      method: "GET",
      signal: abortController.signal,
      credentials: "include",
      headers: {
        "xsrf-token": csrfToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          const accessToken = data.accessToken;

          fetch(url + "/pageVisits", {
            method: "GET",
            credentials: "include",
            signal: abortController2.signal,
            headers: {
              "xsrf-token": csrfToken,
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setLoading(false);
              setData(data);
            });
        }
      });

    return () => {
      abortController.abort();
      abortController2.abort();
    };
  }, [setLoading, token, csrfToken]);
  return (
    <>
      <Seo
        title="Dashboard | Admin Panel - Zpro"
        description="Zpro is a company specializing in the IT sector. We are hard working, creative and passionate in the field of website design, development and software development. We also include services like logo design and website redesign. We will help you grow your business digitally.
        Zpro is well-established and trusted IT company for high quality services with modern and custom design for reasonable cost and with high efficiency. We try our best to make our clients happy and satisfy with our creations."
      />
      <div className="dashboardContainer">
        <AdminTitle title="Dashboard" desc="Dashboard / Analytics" />
        <div className="visits-wrapper">
          <div className="total-visits">
            <p>Total Visits</p>
            <p>{data === null ? 0 : data.totalVisits}</p>
          </div>
          <div className="todays-visits">
            <div className="todays-visits-tit">
              <p>Today's Visits</p>
              {data === null ? null : data.yesterdayVisits >
                data.todayVisits ? (
                <img src={decreaseIcon} alt="icon" />
              ) : (
                <img src={increaseIcon} alt="icon" />
              )}
            </div>
            <p className="highlighted">
              {data !== null ? data.todayVisits : 0}
            </p>
          </div>
        </div>
        <AdminTitle title="Overview" desc="Data Visualization, Statistics" />
        <div
          style={
            Math.floor(window.innerWidth) > 760
              ? { height: 500 }
              : { height: 200 }
          }
        >
          <BarChart data={data === null ? [] : data.pageVisits} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
