import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { URL_DATABASE } from "../api/constants";

export enum SocketEvents {
	USER_ANSWERED = "user_answered",
	UPDATE_ANSWERS_LIST = "update_answers_list",
}
export interface UserAnsweredArgs {
	text: string;
}
interface SocketContextData {
	socket: Socket;
	emmitEvent: (
		event: SocketEvents,
		params?: UserAnsweredArgs
	) => void;
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

  const emmitEvent = (event: SocketEvents, params = {}) => {
    socket?.emit(event, params);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        emmitEvent
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
