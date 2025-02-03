import { ReactElement, FC, useState } from "react";
import { InputType } from "../../../models/enums";
import { IFromInputProps } from "./IFormProps";

export const FormPasswordInput: FC<IFromInputProps> = ({
  label,
  type,
  placeholder,
  ...otherProps
}): ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <input
        type={showPassword ? InputType.text : InputType.password}
        autoComplete="current-password"
        placeholder={placeholder ? placeholder : label}
        {...otherProps}
        className="Form__Input"
      />
      <span className="Form__InputIcon" onClick={handleTogglePassword}>
        👁
      </span>
      <label className="Form__FloatingLabel">{label}</label>
    </>
  );
};
