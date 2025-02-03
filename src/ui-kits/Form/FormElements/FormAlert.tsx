import React from "react";
import { Alert, IAlertProps } from "../../Alert/Alert";

export const FormAlert: React.FC<IAlertProps> = ({
  classname,
  children,
  ...otherProps
}: IAlertProps) => {
  return (
    <Alert classname={`Form__Alert ${classname}`} {...otherProps}>
      {children}
    </Alert>
  );
};
