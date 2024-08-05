import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userDataState } from "@/app/authentication/state";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
}

export function useChatMessage({ socket }: Props) {
  const userData = useRecoilValue(userDataState);
  const [searchedUsername, setSearchedUsername] = useState("");
  const [searchedUserId, setSearchedUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedUsername(e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const startChatSocket = (chatId: string) => {
    socket.emit("join_chat", chatId);
  };

  const sendMessageSocket = (chatId: string) => {
    socket.emit("send_message", {
      chatId,
      userId: userData.id,
      username: userData.username,
      message,
    });
  };

  const searchUser = async () => {
    try {
      const response = await axios.get("/api/chat/searchUser", {
        params: { username: searchedUsername },
      });
      setSearchedUserId(response.data.userId);
      return;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const createAndEmitMessage = async () => {
    try {
      const response = await axios.post("/api/chat/chat");
      startChatSocket(response.data.chatId);
      await sendMessageSocket(response.data.chatId);
      setSearchedUserId("");
      setMessage("");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleMessageSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchUser();
    createAndEmitMessage();
  };

  return {
    handleMessageSubmit,
    handleSearchChange,
    handleMessageChange,
    searchedUsername,
    message,
  };
}
