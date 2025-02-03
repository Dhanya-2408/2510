import { forwardRef, useState } from "react";
import { OnclickEvent } from "../../models/types";
import LogoWrapper from "../../components/Navbar/LogoWrapper";
import { NavMenuWrapper } from "../../components/Navbar/NavMenuWrapper";
import { MenuDrawer } from "../../components/Navbar/MenuDrawer/MenuDrawer";
import "./Style.scss";
import { CountrySelect } from "../../components/Navbar/AuthButton";

export const NavBar = forwardRef<HTMLDivElement>((_, ref) => {
  const [isNavhidden, setNavHidden] = useState(true);

  const handleOnNavCLick = (e?: OnclickEvent): void => {
    e?.preventDefault();
    setNavHidden((prev) => !prev);
  };

  return (
    <section>
      <header className="HeaderSection" ref={ref}>
        <div className="Header">
          <nav className="Header__Wrapper">
            <LogoWrapper />
            <NavMenuWrapper handleOnNavCLick={handleOnNavCLick} />
            <div className="Header__FlexItem hidden-pocket hidden-lap">
              <CountrySelect />
            </div>
          </nav>
          <MenuDrawer
            visibleMenu={isNavhidden}
            handleClose={handleOnNavCLick}
          />
        </div>
      </header>
      <div className="SecondarySection hidden-desk">
        <CountrySelect />
      </div>
    </section>
  );
});
