import React from "react";
import { SocketProvider } from "../../../context/socket";
import ChatPage from "./Chat";
import { useParams } from "react-router-dom";

const ChatWithProvider = () => {
  const { tutorId } = useParams(); // Get tutor ID from URL

  return (
    <SocketProvider tutorId={tutorId}>
      <ChatPage />
    </SocketProvider>
  );
};

export default ChatWithProvider;
