import styled from "styled-components";

export const IconButton = styled.div`
  display: flex;
  justify-content: center;
  height: inherit;
  align-items: flex-end;

  svg {
    padding: 10px;
    border-radius: 50%;
    background-color: var(--primary-900);
    fill: var(--white);

    &:hover {
      opacity: 0.7;
    }
  }
`;
