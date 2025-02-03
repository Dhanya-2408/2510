import { FC, ReactNode, useEffect } from "react";
import { Footer } from "../components/Footer";
import useElementSize from "../custom-hooks/useElementSize";
import useWindowSize from "../custom-hooks/useWindowSize";
import { NavBar } from "../pages/Navbar";
import { ScrollTop } from "../ui-kits/ScrollTop/ScrollTop";

interface LayoutProps {
  children: ReactNode;
}

const LayoutWrapper: FC<LayoutProps> = ({ children }) => {
  const { width, height } = useWindowSize();
  const [headerRef, { height: headerHeight }] = useElementSize();

  useEffect(() => {
    const windowheight = `${height}px`;
    const header__Height = `${headerHeight}px`;
    document.documentElement.style.setProperty("--window-height", windowheight);
    document.documentElement.style.setProperty(
      "--header-height",
      header__Height
    );
  }, [width, height, headerHeight]);

  return (
    <>
      <ScrollTop />
      <NavBar ref={headerRef} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
