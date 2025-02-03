import classNames from "classnames";
import "./PageOverlay.scss";

interface IProps {
  isVisible?: boolean;
}

export const PageOverlay = (props: IProps) => {
  const { isVisible } = props;

  return (
    <div
      className={classNames("OverlayContainer", {
        OverlayContainer__Visible: isVisible,
      })}
    />
  );
};
