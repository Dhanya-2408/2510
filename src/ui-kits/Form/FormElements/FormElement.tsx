import React, { ComponentType } from "react";
import { ChildrenType } from "../../../models/types";

export enum Form__Elemen__Types {
  FormItem = "Form__Item",
  FormHeader = "Form__Header",
  FormLabel = "Form__Label",
  FormGroup = "Form__Group",
  FormItemHelp = "Form__ItemHelp",
}

interface IProps extends ChildrenType {
  elementType?: Form__Elemen__Types;
  classname?: string;
}

export const FormElement: React.FC<IProps> = (props: IProps) => {
  const {
    elementType = Form__Elemen__Types.FormItem,
    classname = "",
    children,
  } = props;

  const getFormElement = (elementType: Form__Elemen__Types) =>
    ({
      [Form__Elemen__Types.FormHeader]: "header",
      [Form__Elemen__Types.FormLabel]: "label",
      [Form__Elemen__Types.FormGroup]: "div",
      [Form__Elemen__Types.FormItem]: "div",
      [Form__Elemen__Types.FormItemHelp]: "button",
    }[elementType]);

  const customElement = getFormElement(elementType);
  const Tag: ComponentType | any | string = customElement;

  return <Tag className={`${elementType} ${classname}`}>{children}</Tag>;
};
