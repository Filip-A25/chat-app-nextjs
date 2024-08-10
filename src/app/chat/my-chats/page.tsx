"use client";

import { io } from "socket.io-client";
import {
  Sidebar,
  ChatHeader,
  InputContainer,
  MessageCard,
} from "@/app/chat/components";
import { PageLoading } from "@/shared";
import { useChat } from "../hooks";
import clsx from "clsx";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_DOMAIN!, {
  withCredentials: true,
  autoConnect: false,
});

export default function MyChats() {
  const { currentMessenger, isMessengerFetching, chat } = useChat(socket);

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
