import Home from "./pages/Home.page";
import About from "./pages/About.page";
import Services from "./pages/Services.page";
import Portfolio from "./components/portfolioComponent/Portfolio.component";
import Careers from "./pages/Careers.page";
import ContactUs from "./components/ContactUs.component";
import AdminPanel from "./admin/pages/AdminPanel.page";
import AdminLogin from "./admin/pages/AdminLogin.page";

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
    path: "/careers/:id",
    component: Careers,
  },
  {
    path: "/contact",
    component: ContactUs,
  },
  {
    path: "/admin",
    component: AdminLogin,
  },
  {
    path: "/admin/*",
    component: AdminPanel,
  },
];

export default routes;
