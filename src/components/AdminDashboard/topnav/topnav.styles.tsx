import styled from "styled-components";

const NavCenter = styled.div<{ show: boolean }>`
  display: flex;
  width: 90vw;
  align-items: center;
  justify-content: space-between;
  ${({ show }) => show && " display: none;"}
`;

const MenuButton = styled.button`
  background: transparent;
  border-color: transparent;
  font-size: 1.2rem;
  color: var(--primary-800);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 50%;

  &:hover {
    color: var(--white);
    background-color: var(--primary-800);
  }
`;

const NavbarWrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  background: var(--white);
  z-index: 999;
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
    background: black;
    border-radius: 20px;
  }

  .btn-container {
    position: relative;
    display: flex;
    gap: 0 1rem;
  }

  .logo-text {
    display: none;
    margin: 0;
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    ${NavCenter} {
      width: 100%;
      padding: 0 16px;
    }

    .logo {
      display: none;
    }

    .logo-text {
      display: block;
    }
  }
`;

const SearchContainer = styled.div<{ show: boolean }>`
  width: 100%;
  display: none;
  height: inherit;
  padding: 0 16px;
  align-items: center;
  ${({ show }) => show && " display: flex;"}
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  padding-left: 20px;
  height: calc(100% - 5px);
`;

export { NavbarWrapper, MenuButton, NavCenter, SearchContainer, SearchInput };
