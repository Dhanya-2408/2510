import styled from "styled-components";

const SidebarLgWrapper = styled.aside`
  display: block;
  box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);

  .sidebar-container {
    background: var(--white);
    min-height: 100vh;
    height: 100%;
    width: 250px;
    margin-left: -250px;
    transition: var(--transition);
    padding: 8px;
  }
  .content {
    position: sticky;
    top: 4;
    background: var(--grey);
    height: 100%;
    border-radius: 10px;
    padding-bottom: 20px;
    display: flex;
    flex-flow: column;
  }
  .show-sidebar {
    margin-left: 0;
  }
  header {
    height: 8rem;
    display: flex;
    align-items: center;
    padding: 20px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: black;
    justify-content: center;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;
export default SidebarLgWrapper;
