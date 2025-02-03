import classNames from "classnames";
import { FC, ReactElement, ReactNode } from "react";
import { CloseIcon } from "../../assets/icons/Close.icon";
import useWindowSize from "../../custom-hooks/useWindowSize";
import { IF } from "../IF";

import "./Drawer.styles.scss";

interface IProps {
  title: string;
  body: ReactNode;
  isHidden: boolean;
  handleClose: () => void;
  footer?: ReactNode;
  position?: string;
  classes?: string;
  spacingTight?: boolean;
}

export const Drawer: FC<IProps> = (props: IProps): ReactElement => {
  const { height } = useWindowSize();
  const {
    title,
    body,
    isHidden,
    handleClose,
    footer,
    classes = "",
    position = "left",
    spacingTight = false,
  } = props;

  return (
    <div
      className={`Drawer ${classes}`}
      style={{ maxHeight: height }}
      aria-hidden={isHidden}
      drawer-position={position}
    >
      <header className="Drawer__Header  Drawer__Container">
        <span className="Drawer__Title Heading">{title}</span>
        <button className="Drawer__Close" onClick={handleClose}>
          <CloseIcon />
        </button>
      </header>
      <div className="Drawer__Content">
        <div className="Drawer__Main" data-drawer-animated-left data-scrollable>
          <div
            className={classNames({
              Drawer__Container: spacingTight,
            })}
          >
            {body}
          </div>
        </div>
        <IF condition={footer !== undefined}>
          <div
            className="Drawer__Footer Drawer__Footer--padded"
            data-drawer-animated-bottom
          >
            {footer}
          </div>
        </IF>
      </div>
    </div>
  );
};
