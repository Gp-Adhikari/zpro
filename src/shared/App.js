import * as React from "react";
import routes from "./routes";
import { Route, Routes } from "react-router-dom";
import NoMatch from "./NoMatch";
import Page404 from "./pages/Page404.page";
import "./scss/styles.css";
import "./scss/responsive.css";
import "./scss/loader.css";

import Header from "./components/Header.component";
import Footer from "./components/Footer.component";

export default function App({ serverData = null }) {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        {routes.map(({ path, fetchInitialData, component: C }) => (
          <Route
            key={path}
            path={path}
            element={
              <C data={serverData} fetchInitialData={fetchInitialData} />
            }
          />
        ))}
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}
