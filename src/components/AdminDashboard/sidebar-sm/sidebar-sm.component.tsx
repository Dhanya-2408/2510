import { CloseIcon } from "../../../assets/icons/Close.icon";
import { LOGO } from "../../../assets/icons/logoIcons";
import { useSidebar } from "../../../context/SidebarContext";
import NavLinks from "../navlinks/navlinks.component";
import SidebarSmWrapper from "./sidebar-sm.styles";

export default function SidebarSm() {
  const { sidebarToggle, toggleSidebar } = useSidebar();

  return (
    <SidebarSmWrapper
      className={
        sidebarToggle ? "sidebar-container show-sidebar" : "sidebar-container"
      }
    >
      <div className="content">
        <button type="button" className="close-btn" onClick={toggleSidebar}>
          <CloseIcon />
        </button>
        <img
          src={LOGO}
          alt="2510_Admin"
          className="logo"
          height={50}
          style={{ marginBottom: "30px" }}
        />
        <NavLinks toggleSidebar={toggleSidebar} />
      </div>
    </SidebarSmWrapper>
  );
}
