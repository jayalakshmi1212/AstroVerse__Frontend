import React, { useEffect, useRef, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import Peer from "peerjs";


const VideoChat = () => {
  const { senderId, recipientId } = useParams(); // Fetching from URL
  const [peerId, setPeerId] = useState(null);
  const [remotePeerId, setRemotePeerId] = useState("");
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [incomingCall, setIncomingCall] = useState(false);
  const [callerId, setCallerId] = useState(null);

  const peerRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const userVideoRef = useRef(null);
  const socketRef = useRef(null);
  const callRef = useRef(null);
  const navigate=useNavigate();

  useEffect(() => {
    socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${senderId}/${recipientId}/`);
    console.log(senderId, recipientId, "Fetching from URL");

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
    
      if (data.type === "incomingCall" && data.to === senderId) {
        setIncomingCall(true);
        setCallerId(data.from);
      } else if (data.type === "callAccepted") {
        callRef.current?.signal(data.signal);
      } else if (data.type === "endCall") {
        handleEndCall();
      }
    };
    

    const peer = new Peer();
    peer.on("open", (id) => {
      setPeerId(id);
      socketRef.current.send(JSON.stringify({ type: "registerPeer", userId: senderId, peerId: id }));
    });

    peer.on("call", (call) => {
      setIncomingCall(true);
      callRef.current = call;
    });

    peerRef.current = peer;

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [senderId, recipientId]);

  const startCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      userVideoRef.current.srcObject = stream;

      const call = peerRef.current.call(remotePeerId, stream);
      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        setRemoteStream(remoteStream);
      });

      callRef.current = call;

      socketRef.current.send(
        JSON.stringify({ type: "initiateCall", from: senderId, to: recipientId, peerId })
      );
    });
  };

  const acceptCall = () => {
    setIncomingCall(false);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      userVideoRef.current.srcObject = stream;

      callRef.current.answer(stream);
      callRef.current.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        setRemoteStream(remoteStream);
      });
    });

    socketRef.current.send(JSON.stringify({ type: "callAccepted", to: callerId }));
  };

  const rejectCall = () => {
    setIncomingCall(false);
    socketRef.current.send(JSON.stringify({ type: "callRejected", to: callerId }));
  };

  const handleEndCall = () => {
    if (callRef.current) {
      callRef.current.close();
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setRemoteStream(null);

    navigate(`/chat/${senderId}/${recipientId}`);
  };

  const endCall = () => {
    socketRef.current.send(JSON.stringify({ type: "endCall", to: recipientId }));
    handleEndCall();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <header className="bg-blue-600 text-white p-6 border-b">
          <h2 className="text-2xl font-bold mb-2">Video Chat</h2>
          <div className="flex gap-4 text-sm opacity-90">
            <span>Your ID: {peerId || 'Loading...'}</span>
            <span>Sender ID: {senderId}</span>
            <span>Recipient ID: {recipientId}</span>
          </div>
        </header>

        {/* Videos Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <video 
              ref={userVideoRef} 
              autoPlay 
              muted 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
              You
            </div>
          </div>
          
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <video 
              ref={remoteVideoRef} 
              autoPlay 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
              Remote User
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="p-6 border-t">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Peer ID"
              value={remotePeerId}
              onChange={(e) => setRemotePeerId(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={startCall}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Start Call
            </button>
            
            <button 
              onClick={endCall}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              End Call
            </button>
          </div>
        </div>

        {/* Incoming Call Dialog */}
        {incomingCall && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Incoming Call</h3>
              <p className="mb-6">From: {callerId}</p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={acceptCall}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Accept
                </button>
                
                <button 
                  onClick={rejectCall}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoChat;