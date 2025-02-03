import { FC, useState, createContext, ReactNode, useContext } from "react";

type SidebarContextType = { sidebarToggle: boolean; toggleSidebar: () => void };

const SidebarContext = createContext<SidebarContextType>(
  {} as SidebarContextType
);

type SidebarProviderProps = {
  children: ReactNode;
};

const SidebarProvider: FC<SidebarProviderProps> = ({
  children,
}: SidebarProviderProps) => {
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarProvider, SidebarContext };

export const useSidebar = () => useContext(SidebarContext);
