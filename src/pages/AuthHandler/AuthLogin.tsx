import { Container } from "../../ui-kits/Container";
import { LoginForm } from "../../components/AuthHandler/LoginForm";
import { PageContentFitScreen } from "../../ui-kits/Wrappers/PageContent.styles";

export const AuthLogin = () => {
  return (
    <Container>
      <PageContentFitScreen isExtraNarrow>
        <LoginForm />
      </PageContentFitScreen>
    </Container>
  );
};
