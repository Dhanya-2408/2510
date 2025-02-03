import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { IF } from "../../IF";
import { isEmpty } from "../../../utils/script";
import { ArrowDownIcon } from "../../../assets/icons/Arrow.icon";

interface IProps {
  name: string;
  options: string[];
  label?: string;
  isTransparent?: boolean;
  disabled?: boolean;
  value?: string;
  onSelect: (name: string, selectedOption: string) => void;
}

export const FormSelectInput: FC<IProps> = (props: IProps) => {
  const {
    isTransparent,
    label,
    options,
    onSelect,
    name,
    disabled = false,
    value,
  } = props;

  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    setSelectedValue(value || "default");
  }, [value]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(name, value);
  };

  return (
    <div
      className={classNames("Select Select--primary", {
        "Select--transparent": isTransparent,
      })}
    >
      <ArrowDownIcon />
      <select
        name={name}
        title={label}
        value={selectedValue}
        onChange={handleSelectChange}
        disabled={disabled}
      >
        <IF condition={!isEmpty(label)}>
          <option value={"default"} disabled>
            {label}
          </option>
        </IF>
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
