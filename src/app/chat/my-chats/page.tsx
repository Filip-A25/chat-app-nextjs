"use client";

import { useState, useEffect } from "react";
import { ChatMessage } from "@/app/chat/types";
import { io } from "socket.io-client";
import { Sidebar, ChatHeader, InputContainer } from "@/app/chat/components";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_DOMAIN!, {
  withCredentials: true,
});

export default function MyChats() {
  const [chat, setChat] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const handleReceiveMessage = (data: ChatMessage) => {
      console.log(data);
      setChat((prevValue) => [...prevValue, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  return (
    <section className="h-full flex flex-col justify-center items-center relative">
      <Sidebar />
      <ChatHeader />
      <section>
        <div>
          {chat.map(({ username, message, timestamp }, index) => (
            <div key={index}>
              <h1>{username}</h1>
              <span>{message}</span>
            </div>
          ))}
        </div>
        <div>
          <InputContainer socket={socket} />
        </div>
      </section>
    </section>
  );
}
