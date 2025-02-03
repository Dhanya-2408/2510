/**
 * ----------------------------------------------------------------------------
 * Product price
 * ----------------------------------------------------------------------------
 */

import styled, { css } from "styled-components";

interface IProps {
  highlight?: boolean;
  compareAt?: boolean;
  isLarge?: boolean;
}

const CompareAtStyles = css`
  position: relative;
  margin-left: ${(props: IProps) => (props.isLarge ? "30px" : "15px")};
  color: #d3b289;

  &::before {
    position: absolute;
    content: "";
    top: 50%;
    left: -0.4em;
    width: calc(100% + 0.8em);
    height: 1px;
    background: currentColor;
  }
`;

export const Price = styled.span<IProps>`
  display: inline-block;
  // ${({ highlight }) => highlight && `color: #d3b289;`};
  ${({ compareAt }) => compareAt && CompareAtStyles};
`;
