import { LogoffIcon } from "../../../assets/icons/Logoff.icon";
import { MenuIcon } from "../../../assets/icons/Menu.icon";
import { useSidebar } from "../../../context/SidebarContext";
import { MenuButton, NavbarWrapper, NavCenter } from "./topnav.styles";

export const AdminTopnav = () => {
  // const dispatch = useAppDispatch();
  const { toggleSidebar } = useSidebar();

  //   const showProfile = useAppSelector(isVisibleProfile);
  //   const showSearch = useAppSelector(isVisibleSearch);
  //   const searchValue = useAppSelector(searchText);

  const toggleSearch = () => {
    // dispatch(setVisibleSearch(!showSearch));
  };

  //   const popupRef = useRef<HTMLDivElement>(null);
  //   useOnClickOutside(popupRef, () => dispatch(setVisibleProfile(false)

  const showSearch = false;

  return (
    <NavbarWrapper>
      <NavCenter show={showSearch}>
        <MenuButton type="button" onClick={toggleSidebar}>
          <MenuIcon />
        </MenuButton>
        <MenuButton type="button" onClick={toggleSearch}>
          <LogoffIcon />
        </MenuButton>
      </NavCenter>
    </NavbarWrapper>
  );
};
