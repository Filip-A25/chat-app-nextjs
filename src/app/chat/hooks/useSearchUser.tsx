import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userDataState } from "@/app/authentication/state";
import {
  messengerArrayState,
  messengerFetchingState,
  chatState,
} from "../state";
import { Socket } from "socket.io-client";
import { Messenger } from "@/app/chat/types";
import { notifyErrorMessage } from "@/app/utils";
import axios from "axios";

export function useSearchUser(socket: Socket) {
  const form = useForm<{ username: string }>();
  const [messengers, setMessengers] = useRecoilState(messengerArrayState);
  const user = useRecoilValue(userDataState);
  const setIsMessengerFetching = useSetRecoilState(messengerFetchingState);
  const setChat = useSetRecoilState(chatState);
  const [isResetReady, setIsResetReady] = useState(false);

  const searchUser = (searchedUser: string) => {
    socket.emit("find_user", searchedUser);
  };

  const createNewChat = async (messengerId: string) => {
    try {
      return await axios.post("/api/chat/chat", {
        userId: user.id,
        messengerId,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const checkIfChatExists = async (messengerId: string) => {
    try {
      const response = await axios.get("/api/chat/searchChat", {
        params: {
          messengerId,
        },
      });
      const chatId = response.data.chat.id;
      return chatId ? chatId : false;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const onSubmit = ({ username }: { username: string }) => {
    if (username === user.username) {
      return notifyErrorMessage("You can't send messages to yourself.");
    }

    setIsMessengerFetching(true);
    const messengerExists = messengers.find(
      (messenger) => messenger.username === username
    );
    if (messengerExists) {
      const newMessengerArray = messengers.map((messenger) => {
        if (messenger.username === username)
          return { ...messenger, isActive: true };
        else return { ...messenger, isActive: false };
      });

      setMessengers(newMessengerArray);
      return;
    }
    searchUser(username);
    setIsResetReady(true);
  };

  useEffect(() => {
    const handleGetMessenger = async ({ messengerId, username }: Messenger) => {
      try {
        if (!messengerId || !username) {
          return notifyErrorMessage("User could not be found.");
        }

        const chat = await checkIfChatExists(messengerId);
        let chatId = chat;
        if (!chat) {
          const response = await createNewChat(messengerId);
          chatId = response.data.chatId;
        }

        setChat((prevValue) => [...prevValue, { chatId }]);

        const newMessengerArray = messengers.map((messenger) => ({
          ...messenger,
          isActive: false,
        }));

        setMessengers([
          ...newMessengerArray,
          {
            messengerId,
            username,
            isActive: true,
            chatId,
          },
        ]);
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setIsMessengerFetching(false);
      }
    };

    if (socket) {
      socket.on("get_user", handleGetMessenger);
    }

    return () => {
      socket.off("get_user", handleGetMessenger);
    };
  }, [socket, messengers]);

  useEffect(() => {
    const handleSearchUserError = (errorMessage: string) => {
      notifyErrorMessage(errorMessage);
    };

    socket.on("user_search_error", handleSearchUserError);

    return () => {
      socket.off("user_search_error", handleSearchUserError);
    };
  }, [socket]);

  useEffect(() => {
    if (!isResetReady) return;
    form.reset();
    setIsResetReady(false);
  }, [form, isResetReady]);

  return { form, onSubmit };
}
