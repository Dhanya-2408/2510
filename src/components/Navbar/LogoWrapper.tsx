import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { EU, JAPAN, LATIN, UK, USA } from "../../assets/icons/logoIcons";
import { CountryEnum } from "../../models/enums";
import { country } from "../../redux/slices/nav/nav.selector";
import { useAppSelector } from "../../redux/store";

const LogoWrapper = () => {
  const countryName = useAppSelector(country);

  const getLogo = (name = CountryEnum.USA) =>
    ({
      [CountryEnum.UK]: UK,
      [CountryEnum.USA]: USA,
      [CountryEnum.EUROPE]: EU,
      [CountryEnum.LATIN]: LATIN,
      [CountryEnum.JAPAN]: JAPAN,
    }[name]);

  const computedLogo = useMemo(() => {
    return getLogo(countryName);
  }, [countryName]);

  return (
    <div className="Header__FlexItem">
      <div className="Header__Logo">
        <NavLink to="/" className="Header__LogoLink">
          <img className="Header__LogoImage" src={computedLogo} alt="2501" />
        </NavLink>
      </div>
    </div>
  );
};

export default LogoWrapper;
