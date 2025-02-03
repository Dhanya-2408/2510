import { ReactElement, FC } from "react";
import { IFromInputProps } from "./IFormProps";

export const FormTextInput: FC<IFromInputProps> = ({
  label,
  type = "text",
  placeholder,
  ...otherProps
}): ReactElement => {
  return (
    <>
      <input
        {...otherProps}
        type={type}
        autoComplete="off"
        placeholder={placeholder ? placeholder : label}
        className="Form__Input"
      />
      {label && <label className="Form__FloatingLabel">{label}</label>}
    </>
  );
};
