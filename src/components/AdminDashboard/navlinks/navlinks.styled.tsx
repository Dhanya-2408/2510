import styled from "styled-components";

const Navlinks = styled.div`
  display: flex;
  flex-direction: column;
  .navlink {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    padding: 0.7rem 1rem;
    text-transform: capitalize;
    transition: var(--transition);
    margin: 20px 10px 0;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000015;
    border-radius: 25px;
    &:hover {
      color: var(--white);
      background: var(--primary-900);
      // background: var(--grey-50);
      // padding-left: 3rem;
      // color: var(--grey-900);
    }
    // &.active {
    //   color: var(--white);
    //
    //   svg {
    //     fill: var(--white);
    //   }
    // }
  }
  @media (min-width: 992px) {
    padding-top: 2rem;
    .navlink {
      padding: 1rem 0 1rem 1.5rem;
    }
  }
`;
export { Navlinks };
