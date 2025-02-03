import { Navigate } from "react-router";
import AuthGuard from "../layout/AuthGuard";
import { AuthDashboard } from "../pages/AuthDashboard/AuthDashboard.component";

const AdminInfo = {
  path: "/admin",
  element: <AuthGuard />,
  children: [
    {
      path: "",
      element: <Navigate to="/admin/dashboard" replace />,
    },
    {
      path: "dashboard",
      element: <AuthDashboard />,
    },
  ],
};

export default AdminInfo;
