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
import { useRecoilState, useRecoilValue } from "recoil";
import { activeMessengerState } from "@/app/chat/state";
import { userDataState } from "@/app/authentication/state";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_DOMAIN!, {
  withCredentials: true,
  autoConnect: false,
});

export default function MyChats() {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const currentMessenger = useRecoilValue(activeMessengerState);
  const [user, setUser] = useRecoilState(userDataState);

  useEffect(() => {
    if (!user?.socketSessionId) {
      const username = user.username;
      const userId = user.id;

      socket.auth = { userId, username };
    }

    socket.connect();
  }, [user]);

  useEffect(() => {
    const receiveSessionId = (id: string) => {
      socket.auth = { id };
      setUser((prevValue) => ({
        ...prevValue,
        sessionId: id,
      }));
    };

    socket.on("session", receiveSessionId);

    return () => {
      socket.off("session", receiveSessionId);
    };
  }, []);

  useEffect(() => {
    const handleReceiveMessage = ({ message, username }: ChatMessage) => {
      setChat((prevValue) => [...prevValue, { username, message }]);
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
