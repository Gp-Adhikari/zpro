import * as React from "react";
import routes from "./routes";
import { Route, Routes } from "react-router-dom";
import Page404 from "./pages/Page404.page";
import "./scss/styles.css";
import "./scss/responsive.css";
import "./scss/loader.css";

import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import TokenContextProvider from "./Contexts/TokenContext";

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
              <TokenContextProvider>
                <C data={serverData} fetchInitialData={fetchInitialData} />
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
