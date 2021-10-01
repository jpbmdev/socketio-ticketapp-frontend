import React, { createContext, useState, useContext } from "react";

type UIcontextType = {
  ocultarMenu: boolean;
  showMenu: () => void;
  hideMenu: () => void;
};

export const UIContext = createContext<UIcontextType | undefined>(undefined);

export const useUIcontext = () => {
  return useContext(UIContext);
};

export const UIProvider: React.FC = ({ children }) => {
  const [ocultarMenu, setOcultarMenu] = useState(false);
  const showMenu = () => {
    setOcultarMenu(false);
  };
  const hideMenu = () => {
    setOcultarMenu(true);
  };
  return (
    <UIContext.Provider value={{ ocultarMenu, showMenu, hideMenu }}>
      {children}
    </UIContext.Provider>
  );
};
