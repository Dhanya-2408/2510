import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Accordian } from "../../../ui-kits/Accordian/Accordian";
import { INavData, ISubMenu, navData } from "../../../mocks/navData";

interface IProps {
  handleClose: () => void;
}

export const MenuBody: FC<IProps> = (props: IProps) => {
  const { handleClose } = props;

  return (
    <nav className="SidebarMenu__Nav SidebarMenu__Nav--primary">
      {navData.map((item: INavData) => {
        return (
          <Accordian
            title={item.title.toUpperCase()}
            key={item.id}
            path={item.url}
            onHandleClose={handleClose}
            dropDown={item.dropDown}
          />
        );
      })}
    </nav>
  );
};
