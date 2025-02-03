import styled from "styled-components";

export const Container = styled.div<{
  isNarrow?: boolean;
  isExtraNarrow?: boolean;
}>`
  margin: 0 auto;
  padding: 0 24px;

  ${({ isNarrow }) => isNarrow && `max-width: 1420px;`};
  ${({ isExtraNarrow }) => isExtraNarrow && ` max-width: 800px;`};

  @media screen and (min-width: 641px) {
    padding: 0 50px;
  }

  @media screen and (min-width: 1240px) {
    padding: 0 80px;
  }
`;

export const PageWidth = styled.div<{
  isNarrow?: boolean;
  isExtraNarrow?: boolean;
}>`
  padding: 0 15px;
  max-width: 1600px;
  margin: 0 auto;

  ${({ isNarrow }) => isNarrow && `max-width: 1300px;`};
  ${({ isExtraNarrow }) => isExtraNarrow && `max-width: 1400px;`};

  @media only screen and (min-width: 590px) {
    padding: 0 30px;
  }
`;
