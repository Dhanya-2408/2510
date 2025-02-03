import { FC } from "react";
import classNames from "classnames";
import { ChildrenType } from "../../models/types";
import "./Alert.scss";

export interface IAlertProps extends ChildrenType {
  isLarge?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  textForm?: boolean;
  classname?: string;
}

export const Alert: FC<IAlertProps> = (props: IAlertProps) => {
  const { isLarge, isError, isSuccess, textForm, classname } = props;

  return (
    <p
      className={classNames(`Alert ${classname}`, {
        "Alert--large": isLarge,
        "Alert--error": isError,
        "Alert--success": isSuccess,
        "Alert--text": textForm,
      })}
    >
      {props.children}
    </p>
  );
};
