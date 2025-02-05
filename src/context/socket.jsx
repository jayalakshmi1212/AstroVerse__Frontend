import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { senderId, recipientId } = useParams(); // Get senderId and recipientId from URL
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!senderId || !recipientId) {
      console.error("Missing senderId or recipientId");
      return;
    }

    const newSocket = new WebSocket(
      `ws://localhost:8000/ws/chat/${senderId}/${recipientId}/`
    );
    console.log({ senderId, recipientId });

    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data.message);
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setSocket(newSocket);

    return () => newSocket.close();
  }, [senderId, recipientId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
