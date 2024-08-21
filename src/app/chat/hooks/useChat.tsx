import { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { ChatMessage, ReceivedMessage } from "../types";
import { userDataState } from "@/app/authentication/state";
import {
  activeMessengerState,
  messengerArrayState,
  messengerFetchingState,
} from "@/app/chat/state";
import { Socket } from "socket.io-client";

export function useChat(socket: Socket) {
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
            chatId,
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
  }, [messengers, socket]);

  useEffect(() => {
    const handleReceiveSentMessage = ({ message, username }: ChatMessage) => {
      addMessageToChat({ message, username });
    };

    socket.on("receive_sent_message", handleReceiveSentMessage);

    return () => {
      socket.off("receive_sent_message", handleReceiveSentMessage);
    };
  }, [socket]);

  return { currentMessenger, isMessengerFetching, chat };
}
