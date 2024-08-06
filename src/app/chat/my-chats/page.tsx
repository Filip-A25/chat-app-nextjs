"use client";

import { useState, useEffect } from "react";
import { ChatMessage } from "@/app/chat/types";
import { io } from "socket.io-client";
import {
  Sidebar,
  ChatHeader,
  InputContainer,
  MessageCard,
} from "@/app/chat/components";
import { useRecoilValue } from "recoil";
import { activeMessengerState } from "@/app/chat/state";
import { userDataState } from "@/app/authentication/state";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_DOMAIN!, {
  withCredentials: true,
});

export default function MyChats() {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const currentMessenger = useRecoilValue(activeMessengerState);
  const user = useRecoilValue(userDataState);

  useEffect(() => {
    const handleReceiveMessage = (data: ChatMessage) => {
      setChat((prevValue) => [...prevValue, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  return (
    <section className="h-full flex flex-col justify-center items-center relative">
      <Sidebar socket={socket} />
      <section className="w-full md:w-[calc(100vw-30vw)] lg:w-[calc(100vw-25vw)] xl:w-[calc(100vw-20vw)] h-full absolute right-0">
        {currentMessenger && (
          <ChatHeader username={currentMessenger.username} />
        )}
        <div className="w-full px-8 absolute top-16">
          {chat.map(({ username, message, timestamp }, index) => (
            <MessageCard key={index} username={username} message={message} />
          ))}
        </div>
        <InputContainer socket={socket} />
      </section>
    </section>
  );
}
