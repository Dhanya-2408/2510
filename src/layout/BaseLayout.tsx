import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import LayoutWrapper from "./LayoutWrapper";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <LayoutWrapper>{children || <Outlet />}</LayoutWrapper>
    </>
  );
};

export default BaseLayout;
