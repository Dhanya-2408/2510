import { ReactElement, FC } from "react";
import { IFromInputProps } from "./IFormProps";

export const FormTextArea: FC<IFromInputProps> = ({
  label,
  placeholder,
  ...otherProps
}): ReactElement => {
  return (
    <>
      <textarea
        {...otherProps}
        placeholder={placeholder ? placeholder : label}
        cols={30}
        rows={10}
        className="Form__Input"
      />
      <label className="Form__FloatingLabel">{label}</label>
    </>
  );
};
