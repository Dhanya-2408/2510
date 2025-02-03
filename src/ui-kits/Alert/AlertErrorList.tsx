import React from "react";
import { ChildrenType } from "../../models/types";
import "./Alert.scss";

export const AlertErrorList: React.FC<ChildrenType> = (props: ChildrenType) => {
  return <ul>{props.children}</ul>;
};
