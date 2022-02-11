import * as React from "react";
import routes from "./routes";
import { Route, Routes } from "react-router-dom";
import Page404 from "./pages/Page404.page";
import "./scss/styles.css";
import "./scss/responsive.css";
import "./scss/loader.css";
import "./scss/adminPanel.css";
import "./scss/adminResponsive.css";

import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import TokenContextProvider from "./Contexts/TokenContext";
import AdminSideBarContextProvider from "./admin/contexts/AdminSideBar.context";

export default function App({ serverData = null }) {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        {routes.map(({ path, component: C }) => (
          <Route
            key={path}
            path={path}
            element={
              <TokenContextProvider>
                <AdminSideBarContextProvider>
                  <C data={serverData} />
                </AdminSideBarContextProvider>
              </TokenContextProvider>
            }
          />
        ))}
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}
