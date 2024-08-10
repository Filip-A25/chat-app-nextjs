import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userDataState } from "@/app/authentication/state";
import { messengerArrayState, messengerFetchingState } from "../state";
import { Socket } from "socket.io-client";
import { Messenger } from "@/app/chat/types";
import axios from "axios";

export function useSearchUser(socket: Socket) {
  const form = useForm<{ username: string }>();
  const [messengers, setMessengers] = useRecoilState(messengerArrayState);
  const user = useRecoilValue(userDataState);
  const setIsMessengerFetching = useSetRecoilState(messengerFetchingState);

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

  const onSubmit = ({ username }: { username: string }) => {
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
  };

  useEffect(() => {
    const handleGetMessenger = async ({ messengerId, username }: Messenger) => {
      try {
        const response = await createNewChat(messengerId);
        setMessengers((prevValue) => [
          ...prevValue,
          {
            messengerId,
            username,
            isActive: true,
            chatId: response.data.chatId,
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
  }, []);

  return { form, onSubmit };
}
