import classNames from "classnames";
import { FC, ReactNode } from "react";
import "./Style.scss";

interface IProps {
  children: ReactNode;
  isNarrow?: boolean;
}

export const PageWidth: FC<IProps> = (props: IProps) => {
  const { children, isNarrow } = props;

  return (
    <div
      className={classNames("PageWidth", {
        "PageWidth--Narrow": isNarrow,
      })}
    >
      {children}
    </div>
  );
};
