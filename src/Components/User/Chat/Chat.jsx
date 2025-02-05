import React, { useEffect, useState, useCallback ,useRef} from "react";
import { useParams } from "react-router-dom";
import { Send, ArrowLeft, MoreVertical, Paperclip, Mic, Image, Smile, Search } from 'lucide-react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ChatComponent = () => {
  const { senderId, recipientId } = useParams();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");
  const socketRef = useRef(null);
  const storedUser = JSON.parse(sessionStorage.getItem('user'));
  const currentUsername = storedUser?.username;
  console.log(currentUsername,'jajajajajajajajajajaja')
  const userProfile = useSelector((state) => state.user.user);
 console.log(userProfile,'hiiiiiiii')

 const connectWebSocket = useCallback(() => {
  if (socketRef.current) {
    console.log("WebSocket already connected, skipping reconnection");
    return;
  }

  console.log("Connecting WebSocket for senderId:", senderId, "recipientId:", recipientId);
  
  const newSocket = new WebSocket(
    `ws://localhost:8000/ws/chat/${senderId}/${recipientId}/`
  );

  newSocket.onopen = () => {
    console.log("WebSocket connected");
  };

  newSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received message:", data);

    if (data.type === "previous_messages") {
      setChatHistory(data.messages);
    } else if (data.type === "new_message") {
      setChatHistory((prev) => [
        ...prev,
        { sender: data.sender, message: data.message, fileUrl: data.file_url || null, timestamp: data.timestamp },
      ]);
    } else if (data.type === "typing") {
      setIsTyping(data.is_typing);
      setTypingUser(data.username);
    }

    // Ensure recipient's username is set correctly
    const recipient = data.messages?.find((msg) => msg.sender !== currentUsername);
    if (recipient) {
      setRecipientUsername(recipient.sender);
    }
  };

  newSocket.onclose = () => {
    console.log("WebSocket disconnected");
    socketRef.current = null; // Ensure the reference is cleared
    setTimeout(() => connectWebSocket(), 3000); // Retry after delay
  };

  socketRef.current = newSocket;
  setSocket(newSocket);
}, [senderId, recipientId]);

useEffect(() => {
  connectWebSocket();
  return () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };
}, [connectWebSocket]);

  

const handleSendMessage = () => {
  if (socketRef.current && message.trim() !== "") {
    console.log("Sending message:", message);

    const newMessage = {
      sender: currentUsername,
      message,
      fileUrl: null,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.send(
      JSON.stringify({ type: "new_message", message })
    );

    setChatHistory((prev) => [...prev, newMessage]);
    setMessage("");
  }
};

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (socket) {
      socket.send(JSON.stringify({ type: "typing", is_typing: e.target.value.length > 0 }));
    }
  };
  const uploadImageToCloudinary = async (file) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'jayalakshmi');
    uploadData.append('cloud_name', 'dwv9coxek');

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dwv9coxek/image/upload`,
      { method: 'POST', body: uploadData }
    );

    if (!res.ok) throw new Error('Image upload failed');

    const data = await res.json();
    return data.url;
  };
  const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const fileUrl = await uploadImageToCloudinary(file);
  if (!fileUrl) return;

  // Optimistically update chat history before sending
  setChatHistory((prev) => [
    ...prev,
    { sender: currentUsername, message: "📁 File sent", file_url: fileUrl, timestamp: new Date().toISOString() },
  ]);

  if (socket) {
    socket.send(
      JSON.stringify({
        type: "new_message",
        message: "",
        file_url: fileUrl,
      })
    );
  }
};


  

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-blue-600">Messages</h1>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center px-6 py-3 bg-white border-b">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="h-5 w-5 text-gray-600"  onClick={() => navigate("/courses")} />
          </button>
          <div className="ml-4 flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {recipientId?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
            <h2 className="text-sm font-semibold">{recipientUsername || "Loading..."}</h2>

              <p className="text-xs text-gray-500">
                {isTyping && typingUser !== currentUsername ? `${typingUser} is typing...` : 'Online'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {chatHistory.map((chat, index) => {
              console.log(chat.file_url, "Cloudinary URL");
              console.log(chat.fileUrl, "Cloudinaryuuuuuuuuuuuuuuuuuuu");


              const isSender = chat.sender === currentUsername;
              return (
                <div
                  key={index}
                  className={`w-full flex ${isSender ? "justify-end" : "justify-start"} items-start gap-2`}
                >
                  {isSender ? (
                    <>
                      <div className="max-w-[60%] bg-blue-600 text-white rounded-t-2xl rounded-l-2xl rounded-br-lg px-4 py-2">
                        {chat.file_url ? (
                          
                          chat.file_url.match(/\.(mp4|webm|ogg)$/) ? (
                            <video controls className="w-full rounded-lg">
                              <source src={chat.file_url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={chat.file_url}
                              alt="Uploaded"
                              className="w-40 h-40  rounded-lg"
                            />
                          )
                        ) : (
                          <p className="text-sm">{chat.message}</p>
                        )}
                        <p className="text-xs text-gray-300 text-right">
                          {new Date(chat.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">
                          {chat.sender.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 text-sm">
                          {chat.sender.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="max-w-[60%] bg-white shadow-sm rounded-t-2xl rounded-r-2xl rounded-bl-lg px-4 py-2">
                        {chat.file_url ? (
                          chat.file_url.match(/\.(mp4|webm|ogg)$/) ? (
                            <video controls className="w-full rounded-lg">
                              <source src={chat.file_url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={chat.file_url}
                              alt="Uploaded"
                              className="w-40 h-40  rounded-lg"
                            />
                          )
                        ) : (
                          <p className="text-sm text-gray-900">{chat.message}</p>
                        )}
                        <p className="text-xs text-gray-300 text-right">
                          {new Date(chat.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>


        {/* Input Area */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-full">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Paperclip className="h-5 w-5 text-gray-600" />
            </button>
            <input
  type="file"
  accept="image/*,video/*"
  onChange={handleFileUpload}
  className="hidden"
  id="fileUpload"
/>
<label htmlFor="fileUpload" className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
  <Image className="h-5 w-5 text-gray-600" />
</label>

            <input
              type="text"
              value={message}
              onChange={handleTyping}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Smile className="h-5 w-5 text-gray-600" />
            </button>
            {message.trim() ? (
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
              >
                <Send className="h-5 w-5" />
              </button>
            ) : (
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Mic className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;

