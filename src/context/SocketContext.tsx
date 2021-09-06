import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { URL_DATABASE } from "../api/constants";

interface SocketContextData {
	socket: Socket;
}

interface SocketContextProviderProps {
	children: ReactNode;
}

export const SocketContext = createContext({} as SocketContextData);

export function SocketContextProvider({
  children,
}: SocketContextProviderProps) {
  const [socket, setSocket] = useState<Socket>({} as Socket);

  useEffect(() => {
    const _socket = io(URL_DATABASE);

    setSocket(_socket);

    _socket.on("connect", () => {
      console.log("Connected to WS");
    });

    return () => {
      if (_socket) {
        _socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
