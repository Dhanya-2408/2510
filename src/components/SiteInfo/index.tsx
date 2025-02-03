import { FC, useMemo } from "react";
import { infoData } from "../../mocks/infoData";
import { CountryEnum } from "../../models/enums";
import { Container } from "../../ui-kits/Container";
import {
  PageContent,
  PageHeader,
} from "../../ui-kits/Wrappers/PageContent.styles";

interface IProps {
  title: CountryEnum;
}

export const SiteInfo: FC<IProps> = (props: IProps) => {
  const { title: countryName } = props;

  const computedData = useMemo(() => {
    return infoData[countryName];
  }, [countryName]);

  return (
    <Container>
      <PageContent isLarge>
        <PageHeader>
          <h1 className="Heading Text--alignCenter Text--highlight">
            {` WHY MADE IN ${countryName.toUpperCase()} MATTERS ?`}
          </h1>
        </PageHeader>
        {computedData.map((item: string, i: number) => (
          <p key={i}>{item}</p>
        ))}
        <br />
        <h4 className="Heading Text--highlight">
          <div>Pan Pan</div>
          <div>Foundar</div>
          <div>2510.ORG</div>
          <div>{`Commit to Made In ${countryName}`}</div>
        </h4>
      </PageContent>
    </Container>
  );
};
