import {
  EUBanner,
  JAPANBanner,
  LATINBanner,
  UKBanner,
  USABanner,
} from "../../assets/images";
import { SplitBanner } from "../../components/Banner";
import { SiteInfo } from "../../components/SiteInfo";
import { CountryEnum } from "../../models/enums";
import { country } from "../../redux/slices/nav/nav.selector";
import { useAppSelector } from "../../redux/store";

export const Home = () => {
  const countryName = useAppSelector(country);

  const getLogo = (name = CountryEnum.USA) =>
    ({
      [CountryEnum.UK]: UKBanner,
      [CountryEnum.USA]: USABanner,
      [CountryEnum.EUROPE]: EUBanner,
      [CountryEnum.LATIN]: LATINBanner,
      [CountryEnum.JAPAN]: JAPANBanner,
    }[name]);

  return (
    <div id={countryName}>
      <SplitBanner url={getLogo(countryName)} title={countryName} />
      <SiteInfo title={countryName} />
    </div>
  );
};
