import { FC, ReactElement, useRef } from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import useHover from "../../custom-hooks/useHover";
import { INavData, ISubMenu } from "../../mocks/navData";
import { IF } from "../../ui-kits/IF";
import { isEmpty } from "../../utils/script";

interface IProps {
  item: INavData;
}

export const NavMenuItem: FC<IProps> = (props: IProps): ReactElement => {
  const { item } = props;
  const hoverRef = useRef(null);
  const { value: isShown, handleMouseLeave } = useHover(hoverRef);

  return (
    <li
      className={classnames("HorizontalList__Item u-h5", {
        "is-active": isShown,
      })}
      ref={hoverRef}
    >
      <NavLink
        to={`/${item.url}`}
        className={classnames("Heading", {
          Header__LinkSpacer: !item.dropDown,
        })}
      >
        {item.title.toUpperCase()}
      </NavLink>

      <IF condition={!isEmpty(item.dropDown)}>
        <div className="DropdownMenu u-h7 Heading" aria-hidden={!isShown}>
          <ul className="Linklist">
            {item.dropDown?.map((submenu: ISubMenu, index: number) => (
              <li className="Linklist__Item" key={submenu.title + index}>
                <NavLink
                  to={`/${submenu.subUrl}`}
                  className="Link Text--subdued  Link--primary"
                  onClick={handleMouseLeave}
                >
                  {submenu.title.toUpperCase()}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </IF>
    </li>
  );
};
