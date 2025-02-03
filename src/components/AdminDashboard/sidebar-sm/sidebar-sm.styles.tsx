import styled from "styled-components";

const SidebarSmWrapper = styled.div`
  &.sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }

  &.show-sidebar {
    z-index: 99;
    opacity: 1;
    display: flex;
  }

  .content {
    background: var(--white);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: 1rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: scroll;
  }

  .navlink {
    // width: 100px;
    justify-content: center;
    padding: 1rem;
    border-radius: 10px;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 1rem;
    color: var(--primary-900);
    cursor: pointer;
  }

  @media (min-width: 992px) {
    display: none !important;
  }
`;
export default SidebarSmWrapper;
