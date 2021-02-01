import React, { useState, useEffect, useContext } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContextProps {
  socket: Socket | undefined;
}
const SocketContext = React.createContext<ISocketContextProps>({
  socket: undefined,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: React.ReactNode;
  id: string;
}
export const SocketProvider = ({ children, id }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { id } });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);

  const value = {
    socket: socket,
  };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
