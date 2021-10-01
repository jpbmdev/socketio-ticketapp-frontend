import React from "react";
import { SocketProvider } from "./context/socketContext";
import { UIProvider } from "./context/UIContext";
import { RouterPage } from "./pages/RouterPage";

const TicketApp: React.FC = () => {
  return (
    <SocketProvider>
      <UIProvider>
        <RouterPage />
      </UIProvider>
    </SocketProvider>
  );
};

export default TicketApp;
