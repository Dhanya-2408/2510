import classNames from "classnames";
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import useElementSize from "../../custom-hooks/useElementSize";
import { ISubMenu } from "../../mocks/navData";
import { isEmpty } from "../../utils/script";
import { IF } from "../IF";
import "./Accordian.scss";

interface IProps {
  title: string;
  path: string;
  onHandleClose: () => void;
  isPadded?: boolean;
  isAutoExpand?: boolean;
  isLarge?: boolean;
  dropDown?: ISubMenu[];
}

export const Accordian: FC<IProps> = (props: IProps) => {
  const {
    title,
    isPadded,
    isAutoExpand,
    isLarge,
    path,
    onHandleClose,
    dropDown,
  } = props;

  const [squareRef, { height }] = useElementSize();
  const [isExpand, setIsExpand] = useState(false);
  const handleClick = () => {
    setIsExpand(!isExpand);
  };

  return (
    <div
      className={classNames("Collapsible", {
        "Collapsible--padded": isPadded,
        "Collapsible--autoExpand": isAutoExpand,
        "Collapsible--large": isLarge,
      })}
    >
      <IF condition={!isEmpty(dropDown)}>
        <button
          type="button"
          className="Collapsible__Button u-h5 Heading"
          aria-expanded={isExpand}
          onClick={handleClick}
        >
          {title}
          <span className="Collapsible__Plus"></span>
        </button>
        <div
          className="Collapsible__Inner"
          style={{
            height: isExpand ? `${height}px` : "0",
          }}
        >
          <div className="Collapsible__Content" ref={squareRef}>
            {dropDown?.map((submenu: ISubMenu) => (
              <div
                className="Collapsible"
                key={submenu.title}
                onClick={onHandleClose}
              >
                <NavLink
                  to={`/${submenu.subUrl}`}
                  className="Collapsible__Button Heading Text--subdued Link Link--primary u-h7"
                  onClick={handleClick}
                >
                  {submenu.title.toUpperCase()}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </IF>
      <IF condition={isEmpty(dropDown)}>
        <NavLink
          to={path}
          className="Collapsible__Button Heading u-h5 Link Link--primary"
          onClick={onHandleClose}
        >
          {title}
        </NavLink>
      </IF>
    </div>
  );
};
