import { ContactForm } from "../../components/ContactForm";
import { Container } from "../../ui-kits/Container";
import { PageContentFitScreen } from "../../ui-kits/Wrappers/PageContent.styles";

export const Contact = () => {
  return (
    <Container>
      <PageContentFitScreen isNarrow>
        <ContactForm />
      </PageContentFitScreen>
    </Container>
  );
};
