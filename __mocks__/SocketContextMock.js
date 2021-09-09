import { SocketContext } from "../src/context/SocketContext";
import answers from "./answers";

export function SocketContextProviderMockSuccess({ children }) {
  const emmitEventMockSuccess = (event, params, callback) => {
    callback({ answer: answers[0] });
  };

  return (
    <SocketContext.Provider
      value={{
        socket: {
          on: (event, callbackFn) => {
            callbackFn({ answersList: answers });
          },
          disconnect: () => console.log("socket.disconnect"),
        },
        isConnected: true,
        emmitEvent: emmitEventMockSuccess,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function SocketContextProviderMockError({ children }) {
  const emmitEventMockSuccess = (event, params, callback) => {
    callback({ error: "Error message" });
  };

  return (
    <SocketContext.Provider
      value={{
        socket: {
          on: () => console.log("socket.on"),
          disconnect: () => console.log("socket.disconnect"),
        },
        isConnected: true,
        emmitEvent: emmitEventMockSuccess,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
