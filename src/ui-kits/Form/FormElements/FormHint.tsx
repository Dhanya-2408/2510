import classNames from "classnames";
import React from "react";
import { ChildrenType } from "../../../models/types";

interface IProps extends ChildrenType {
  isCenter?: boolean;
}

export const FormHint: React.FC<IProps> = (props: IProps) => {
  const { isCenter, children } = props;
  return (
    <div
      className={classNames("Form__Hint", {
        "Form__Hint--center": isCenter,
      })}
    >
      {children}
    </div>
  );
};
