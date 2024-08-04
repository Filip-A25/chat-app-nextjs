"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { userDataState } from "@/app/authentication/state";
import { ChatMessage } from "@/app/chat/types";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_DOMAIN!, {
  withCredentials: true,
});
console.log(socket);

export default function MyChats() {
  const userData = useRecoilValue(userDataState);
  const [searchedUsername, setSearchedUsername] = useState("");
  const [searchedUserId, setSearchedUserId] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedUsername(e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
    <section className="h-full flex flex-col justify-center items-center">
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
          <form id="message-form" onSubmit={handleMessageSubmit}>
            <label>User:</label>
            <input
              type="text"
              placeholder="Search for users..."
              value={searchedUsername}
              onChange={handleSearchChange}
            />
            <label>Message:</label>
            <textarea
              placeholder="Write your message here..."
              onChange={handleMessageChange}
            ></textarea>
            <button>Send</button>
          </form>
        </div>
      </section>
    </section>
  );
}
