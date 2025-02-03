import { LOGO } from "../../../assets/icons/logoIcons";
import { useSidebar } from "../../../context/SidebarContext";
import NavLinks from "../navlinks/navlinks.component";
import SidebarLgWrapper from "./sidebar-lg.styles";

const SidebarLg = () => {
  const { sidebarToggle } = useSidebar();

  return (
    <SidebarLgWrapper className="lg">
      <div
        className={
          sidebarToggle
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <img
              src={LOGO}
              alt="2510_Admin"
              className="logo"
              height={90}
              style={{ background: "black", borderRadius: "20px" }}
            />
          </header>
          <NavLinks />
        </div>
      </div>
    </SidebarLgWrapper>
  );
};

export default SidebarLg;
