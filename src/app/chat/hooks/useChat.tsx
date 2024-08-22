"use client";

import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { ChatMessage, ChatMessageData, ReceivedMessage } from "../types";
import { userDataState } from "@/app/authentication/state";
import {
  activeMessengerState,
  messengerArrayState,
  messengerFetchingState,
  chatState,
  activeChatState,
} from "@/app/chat/state";
import { Socket } from "socket.io-client";

export function useChat(socket: Socket) {
  const currentMessenger = useRecoilValue(activeMessengerState);
  const [user, setUser] = useRecoilState(userDataState);
  const [messengers, setMessengers] = useRecoilState(messengerArrayState);
  const [isMessengerFetching, setIsMessengerFetching] = useRecoilState(
    messengerFetchingState
  );
  const [chats, setChats] = useRecoilState(chatState);
  const activeChat = useRecoilValue(activeChatState);

  const addMessageToChat = ({ chatId, username, message }: ChatMessageData) => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.chatId === chatId) {
          return {
            ...chat,
            messages: [...(chat.messages || []), { username, message }],
          };
        }
        return chat;
      })
    );
  };

  useEffect(() => {
    if (user && !user.socketSessionId) {
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
  }, [socket]);

  useEffect(() => {
    const handleReceiveMessage = ({
      message,
      senderId,
      senderUsername,
      chatId,
    }: ReceivedMessage) => {
      const containsMessengers = Boolean(messengers.length) ? true : false;
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
            chatId,
          },
        ]);
      }
      const chatExists = chats.find((chat) => chat.chatId === chatId);
      if (!chatExists) {
        setChats((prevChats) => [...prevChats, { chatId }]);
      }

      setIsMessengerFetching(false);
      addMessageToChat({ chatId, message, username: senderUsername });
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [messengers, socket]);

  useEffect(() => {
    const handleReceiveSentMessage = ({ message, username }: ChatMessage) => {
      if (!currentMessenger?.chatId) throw new Error("Chat ID doesn't exist.");
      addMessageToChat({ chatId: currentMessenger.chatId, message, username });
    };

    socket.on("receive_sent_message", handleReceiveSentMessage);

    return () => {
      socket.off("receive_sent_message", handleReceiveSentMessage);
    };
  }, [socket, currentMessenger?.chatId]);

  return { currentMessenger, isMessengerFetching, activeChat };
}
