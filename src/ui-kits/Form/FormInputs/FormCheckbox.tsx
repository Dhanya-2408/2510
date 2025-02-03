import { ChangeEvent } from "react";

interface IProps<T> {
  item: T;
  label: string;
  name: string;
  isChecked: boolean;
  handleChange: (item: T) => void;
}

export const FormCheckInput = <T extends Object>(props: IProps<T>) => {
  const { handleChange, label, name, item, isChecked } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(item);
  };

  return (
    <>
      <input
        type="checkbox"
        id={label}
        name={name}
        checked={isChecked}
        onChange={onChangeHandler}
        className="Form__Checkbox"
      />
      {/* <TickIcon /> */}
      <label htmlFor={label}>{label}</label>
    </>
  );
};
