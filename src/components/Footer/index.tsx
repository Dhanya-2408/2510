import { Container } from "../../ui-kits/Container";
import { FooterContactInfo } from "./FooterContactInfo";
import { FooterNewsLetter } from "./FooterNewsLetter";
import "./Style.scss";

export const Footer = () => {
  return (
    <footer className="Footer ">
      <Container>
        <div className="Footer__Inner u-h5">
          <FooterNewsLetter />
          <FooterContactInfo />
        </div>
      </Container>
    </footer>
  );
};
