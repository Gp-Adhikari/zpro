import React, { useState, useEffect, useContext } from "react";
import AdminTitle from "./AdminTitle.Component";
import { TokenContext } from "../../Contexts/TokenContext";
import { url } from "../../URL";
import Seo from "../../components/Seo.component";

const Applicants = () => {
  const { token, csrfToken, setLoading } = useContext(TokenContext);

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    setApplicants(null);
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

          fetch(url + "/vacancy/applicants", {
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
              setApplicants(data.applicants);
            });
        }
      });

    return () => {
      abortController.abort();
      abortController2.abort();
    };
  }, [setLoading, token, csrfToken]);

  const deleteApplicants = (applicant) => {
    if (applicants.includes(applicant)) {
      setApplicants(applicants.filter((item) => item !== applicant));
    } else {
      return;
    }
    setLoading(true);
    fetch(url + "/token", {
      method: "GET",
      credentials: "include",
      headers: {
        "xsrf-token": csrfToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          const accessToken = data.accessToken;
          fetch(url + "/applicants", {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "xsrf-token": csrfToken,
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              id: applicant.file,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setLoading(false);
            });
        }
      });
  };
  return (
    <>
      <Seo
        title="Applicants | Admin Panel - Zprofs"
        description="Zprofs is a company specializing in the IT sector. We are hard working, creative and passionate in the field of website design, development and software development. We also include services like logo design and website redesign. We will help you grow your business digitally.
      Zprofs is well-established and trusted IT company for high quality services with modern and custom design for reasonable cost and with high efficiency. We try our best to make our clients happy and satisfy with our creations."
      />
      <div className="applicantsContainer">
        <AdminTitle title="Applicants" desc="Applicants / Applicants" />
        <div className="contacts-wrapper">
          {applicants === null ? (
            <h3>Loading ...</h3>
          ) : applicants[0] !== undefined ? (
            applicants.map((data) => (
              <div className="contacts" key={data._id}>
                <h2>Name: {data.applicantName}</h2>
                <div className="contact-info">
                  <p>Applied For:</p>
                  <p>{data.vacancyTitle}</p>
                </div>
                <div className="contact-info">
                  <p>Date:</p>
                  <p>{data.date.split("T")[0]}</p>
                </div>
                <div className="contact-info">
                  <p>Address:</p>
                  <p>{data.address}</p>
                </div>
                <div className="contact-info">
                  <p>Phone Number:</p>
                  <p>{data.ph}</p>
                </div>
                <div className="contact-info">
                  <p>Email:</p>
                  <p>{data.email}</p>
                </div>
                <div className="contact-infomsg">
                  <p>Description:</p>
                  <p>{data.desc}</p>
                </div>
                <div className="contact-info">
                  <input
                    type="button"
                    value="Download CV"
                    onClick={() => {
                      const filename = data.file.split(".pdf")[0];
                      fetch(url + "/token", {
                        method: "GET",
                        credentials: "include",
                        headers: {
                          "xsrf-token": csrfToken,
                        },
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.status) {
                            const accessToken = data.accessToken;

                            window.open(
                              `${url}/applicant/${filename}/${accessToken}`
                            );
                          }
                        });
                    }}
                  />
                </div>
                <input
                  type="button"
                  value="Remove"
                  onClick={() => deleteApplicants(data)}
                />
              </div>
            ))
          ) : (
            <p className="not-available">No Applicants.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Applicants;
