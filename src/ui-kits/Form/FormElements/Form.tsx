import React from "react";
import classNames from "classnames";
import { ChildrenType } from "../../../models/types";

interface Iprops extends ChildrenType {
  spacingTight?: boolean;
  isSmall?: boolean;
  onSubmit?: (e: any) => void;
  classname?: string;
}

export const Form: React.FC<Iprops> = (props: Iprops) => {
  const { children, classname = "", isSmall, spacingTight, onSubmit } = props;

  return (
    <form
      className={classNames(`Form ${classname}`, {
        "Form--small": isSmall,
        "Form--spacingTight": spacingTight,
      })}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};
