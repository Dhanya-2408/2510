import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "./icon-btn.styles";

interface IconBtnProps {
  children: ReactNode;
}
const IconBtn = ({ children }: IconBtnProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth");
  };

  return <IconButton onClick={handleClick}>{children}</IconButton>;
};

export default IconBtn;
