import { FC, ReactElement } from "react";
import { MenuIcon } from "../../assets/icons/Menu.icon";
import { INavData, navData } from "../../mocks/navData";
import { OnclickEvent } from "../../models/types";
import { NavMenuItem } from "./NavMenuItem";

interface IProps {
  handleOnNavCLick: (e: OnclickEvent) => void;
}

export const NavMenuWrapper: FC<IProps> = (props: IProps): ReactElement => {
  const { handleOnNavCLick } = props;

  return (
    <div className="Header__FlexItem Header__FlexItem--fill">
      <button
        className="Header__Icon Icon-Wrapper--clickable hidden-desk"
        onClick={handleOnNavCLick}
      >
        <MenuIcon />
      </button>
      <div className="Header__MainNav hidden-pocket hidden-lap">
        <ul className="HorizontalList HorizontalList--spacingExtraLoose">
          {navData.map((item: INavData) => (
            <NavMenuItem item={item} key={item.title} />
          ))}
        </ul>
      </div>
    </div>
  );
};
