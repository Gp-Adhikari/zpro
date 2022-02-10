import Home from "./pages/Home.page";
import About from "./pages/About.page";
import Services from "./pages/Services.page";
import Portfolio from "./components/portfolioComponent/Portfolio.component";
import Careers from "./pages/Careers.page";
import ContactUs from "./components/ContactUs.component";
import Grid from "./Grid";
import { fetchPopularRepos } from "./api";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/services",
    component: Services,
  },
  {
    path: "/portfolio",
    component: Portfolio,
  },
  {
    path: "/careers",
    component: Careers,
  },
  {
    path: "/contact",
    component: ContactUs,
  },
  {
    path: "/popular/:id",
    component: Grid,
    fetchInitialData: (path = "") => fetchPopularRepos(path.split("/").pop()),
  },
];

export default routes;
