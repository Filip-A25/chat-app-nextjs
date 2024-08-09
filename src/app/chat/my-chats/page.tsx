"use client";

import { useState, useEffect } from "react";
import { ChatMessage, ReceivedMessage } from "@/app/chat/types";
import { io } from "socket.io-client";
import {
  Sidebar,
  ChatHeader,
  InputContainer,
  MessageCard,
} from "@/app/chat/components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeMessengerState,
  messengerArrayState,
  messengerFetchingState,
} from "@/app/chat/state";
import { userDataState } from "@/app/authentication/state";
import { PageLoading } from "@/shared";
import clsx from "clsx";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_DOMAIN!, {
  withCredentials: true,
  autoConnect: false,
});

export default function MyChats() {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const currentMessenger = useRecoilValue(activeMessengerState);
  const [user, setUser] = useRecoilState(userDataState);
  const [messengers, setMessengers] = useRecoilState(messengerArrayState);
  const [isMessengerFetching, setIsMessengerFetching] = useRecoilState(
    messengerFetchingState
  );

  const addMessageToChat = ({ message, username }: ChatMessage) => {
    setChat((prevValue) => [...prevValue, { message, username }]);
  };

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
    const handleReceiveMessage = ({
      message,
      senderId,
      senderUsername,
    }: ReceivedMessage) => {
      const containsMessengers = messengers.length > 0 ? true : false;
      const hasIdenticalMessenger = messengers.some(
        (messenger) => messenger.messengerId === senderId
      );

      if (!hasIdenticalMessenger) {
        setMessengers((prevValue) => [
          ...prevValue,
          {
            messengerId: senderId,
            username: senderUsername,
            isActive: containsMessengers ? false : true,
          },
        ]);
      }

      setIsMessengerFetching(false);
      addMessageToChat({ message, username: senderUsername });
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [messengers]);

  useEffect(() => {
    const handleReceiveSentMessage = ({ message, username }: ChatMessage) => {
      addMessageToChat({ message, username });
    };

    socket.on("receive_sent_message", handleReceiveSentMessage);

    return () => {
      socket.off("receive_sent_message", handleReceiveSentMessage);
    };
  }, []);

  return (
    <section className="h-full flex flex-col justify-center items-center relative">
      <Sidebar socket={socket} />
      <section
        className={clsx(
          "w-full md:w-[calc(100vw-30vw)] lg:w-[calc(100vw-25vw)] xl:w-[calc(100vw-20vw)] h-full absolute right-0",
          !currentMessenger || isMessengerFetching
            ? "flex justify-center items-center"
            : ""
        )}
      >
        {!currentMessenger ? (
          <h1 className="text-lg md:text-xl lg:text-2xl text-light-grey opacity-50 text-center">
            Search for a user to start messaging!
          </h1>
        ) : isMessengerFetching ? (
          <PageLoading />
        ) : (
          <>
            <ChatHeader username={currentMessenger.username} />
            <div className="w-full px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-6 absolute top-16">
              {chat.map(({ username, message, timestamp }, index) => (
                <MessageCard
                  key={index}
                  username={username}
                  message={message}
                />
              ))}
            </div>
            <InputContainer socket={socket} />
          </>
        )}
      </section>
    </section>
  );
}
