import { NavLink } from "react-router-dom";
import links, { ILink } from "./links";
import { Navlinks } from "./navlinks.styled";

interface INavLinksProps {
  toggleSidebar?: () => void;
}

const NavLinks = ({ toggleSidebar }: INavLinksProps) => {
  const classes = "navlink u-h6";

  return (
    <Navlinks>
      {links.map((link: ILink) => {
        const { text, path, id } = link;

        return (
          <NavLink
            to={`/admin/dashboard?rc=${path}`}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? `${classes} active` : classes
            }
          >
            {text}
          </NavLink>
        );
      })}
    </Navlinks>
  );
};

export default NavLinks;
