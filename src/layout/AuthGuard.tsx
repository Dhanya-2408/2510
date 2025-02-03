import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface AuthGuardProps {
  children?: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  return <>{children || <Outlet />}</>;
};

export default AuthGuard;
