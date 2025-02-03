import classNames from "classnames";
import { FC, ReactNode } from "react";
import "./Style.scss";

interface IProps {
  children: ReactNode;
  isNarrow?: boolean;
  isExtraNarrow?: boolean;
}

export const Container: FC<IProps> = (props: IProps) => {
  const { children, isNarrow, isExtraNarrow } = props;

  return (
    <div
      className={classNames("Container", {
        "Container--Narrow": isNarrow,
        "Container--ExtraNarrow": isExtraNarrow,
      })}
    >
      {children}
    </div>
  );
};
