import { useNavigate } from "react-router";
import { CountryEnum } from "../../models/enums";
import { country } from "../../redux/slices/nav/nav.selector";
import { setCountry } from "../../redux/slices/nav/nav.slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { FormSelectInput } from "../../ui-kits/Form";

interface IProps {
  handleDrawClose?: () => void;
}

export const CountrySelect = (props: IProps) => {
  const { handleDrawClose } = props;

  const contryOptions: CountryEnum[] = [
    CountryEnum.USA,
    CountryEnum.EUROPE,
    CountryEnum.JAPAN,
    CountryEnum.UK,
    CountryEnum.LATIN,
  ];

  const dispatch = useAppDispatch();
  const countryName = useAppSelector(country);
  const navigate = useNavigate();

  const handleSelectChange = (name: string, option: string) => {
    dispatch(setCountry(option as CountryEnum));
    navigate("/home");

    // const element = document.getElementById(option);
    // element!.scrollIntoView({
    //   behavior: "smooth",
    //   inline: "nearest",
    // });

    if (handleDrawClose) {
      handleDrawClose();
    }
  };

  return (
    <FormSelectInput
      name="Country"
      options={contryOptions}
      value={countryName}
      onSelect={handleSelectChange}
    />
  );
};
