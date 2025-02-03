import { Navigate } from "react-router";
import { Home } from "../pages/Home";
import { Contact } from "../pages/Contact";
import BaseLayout from "../layout/BaseLayout";
import { CaseStudy } from "../pages/CaseStudy";
import { AuthLogin } from "../pages/AuthHandler/AuthLogin";
import { ComingSoon } from "../components/ComingSoon";

const PagesInfo = {
  path: "/",
  element: <BaseLayout />,
  children: [
    {
      path: "",
      element: <Navigate to="/home" replace />,
    },
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "brand",
      element: <ComingSoon />,
    },
    {
      path: "industry",
      element: <ComingSoon />,
    },
    {
      path: "consultant",
      element: <ComingSoon />,
    },
    {
      path: "contact",
      element: <Contact />,
    },
    {
      path: "casestudy/:id",
      element: <CaseStudy />,
    },
    {
      path: "login",
      element: <AuthLogin />,
    },
  ],
};

export default PagesInfo;
