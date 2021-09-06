import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { URL_DATABASE } from "../api/constants";
import { AnswerEntity } from "../interfaces/Answer";

export enum SocketListenEvents {
	UPDATE_ANSWERS_LIST = "update_answers_list",
}

export enum SocketEmmitEvents {
	USER_ANSWERED = "user_answered",
}
export interface UserAnsweredArgs {
	text: string;
}

export interface UpdateAnswersArgs {
	answersList: AnswerEntity[];
}

export type EmmitCallbackParam = ({ error, answer }: { error?: string, answer?: AnswerEntity }) => void;

interface SocketContextData {
	socket: Socket;
	isConnected: boolean;
	emmitEvent: (
		event: SocketEmmitEvents,
		params?: UserAnsweredArgs,
		callback?: EmmitCallbackParam
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
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const _socket = io(URL_DATABASE);

    setSocket(_socket);

    _socket.on("connect", () => {
      console.log("Connected to WS");
      setIsConnected(true);
    });

    return () => {
      if (_socket) {
        _socket.disconnect();
        setIsConnected(false);
      }
    };
  }, []);

  const emmitEvent = (event: SocketEmmitEvents, params = {}, callback?: EmmitCallbackParam) => {
    socket?.emit(event, params, callback);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        emmitEvent
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
