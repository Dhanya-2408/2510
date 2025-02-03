import styled from "styled-components";

export const PageContent = styled.div<{
  isNarrow?: boolean;
  isExtraNarrow?: boolean;
  isLarge?: boolean;
  spacingTight?: boolean;
}>`
  max-width: 1000px;
  margin: 35px auto;

  ${({ isNarrow }) => isNarrow && `max-width: 680px;`};
  ${({ isExtraNarrow }) => isExtraNarrow && `max-width: 400px;`};
  ${({ isLarge }) => isLarge && `max-width: 1300px;`};

  @media screen and (min-width: 641px) {
    margin-bottom: 80px;
    margin-top: 80px;

    ${({ spacingTight }) => spacingTight && `margin: 35px auto;`};
  }
`;

export const PageContentFitScreen = styled(PageContent)`
  display: flex;
  min-height: calc(100vh - 120px);
  align-items: center;

  @supports (--css: variables) {
    min-height: calc(var(--window-height) - var(--header-height) - 120px);
  }

  @media screen and (min-width: 641px) {
    min-height: calc(100vh - 160px);
    @supports (--css: variables) {
      min-height: calc(var(--window-height) - var(--header-height) - 160px);
    }
  }
`;

export const PageHeader = styled.header`
  position: relative;
  margin: 35px 0;

  @media screen and (min-width: 641px) {
    margin: 50px 0;
  }
`;
