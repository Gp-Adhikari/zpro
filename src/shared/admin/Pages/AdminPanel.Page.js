import React, { useContext, useEffect } from "react";
import SideBar from "../Components/SideBar.Component";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminHeader from "../Components/AdminHeader.Component";
import Dashboard from "../Components/Dashboard.Component";
import Portfolio from "../Components/Portfolio.Component";
import Careers from "../Components/Careers.Component";
import Contact from "../Components/Contact.Component";

import { TokenContext } from "../../Contexts/TokenContext";
import Applicants from "../Components/Applicants.Component";

const AdminPanel = () => {
  const { token, loading, setLoading, loadingChecker } =
    useContext(TokenContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null && token !== undefined && token !== "") {
      return;
    } else {
      setLoading(true);
    }
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <>
        <div className="dFlex">
          <SideBar />
          <div className="mainContent">
            <AdminHeader />
            <Routes>
              <Route path="/dashboard" exact="true" element={<Dashboard />} />
              <Route path="/portfolio" exact="true" element={<Portfolio />} />
              <Route path="/careers" exact="true" element={<Careers />} />
              <Route path="/contact" exact="true" element={<Contact />} />
              <Route path="/applicants" exact="true" element={<Applicants />} />
            </Routes>
          </div>
        </div>
      </>
    );
  }
};

export default AdminPanel;
