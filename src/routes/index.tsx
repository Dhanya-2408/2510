import { useRoutes } from "react-router-dom";
import AdminInfo from "./AdminInfo";
import PagesInfo from "./PagesInfo";

const all_routes = [PagesInfo, AdminInfo];

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
  return useRoutes(all_routes);
}
