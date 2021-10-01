import { useEffect } from "react";
import { useUIcontext } from "../context/UIContext";

export const useHideMenu = (ocultar: boolean) => {
  const { showMenu, hideMenu } = useUIcontext()!;
  useEffect(() => {
    if (ocultar) {
      hideMenu();
    } else {
      showMenu();
    }
  }, [ocultar, hideMenu, showMenu]);
};
