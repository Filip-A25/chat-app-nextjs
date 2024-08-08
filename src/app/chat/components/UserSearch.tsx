import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { TextInput } from "./";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  messengerArrayState,
  chatIdState,
  activeMessengerState,
} from "@/app/chat/state";
import { userDataState } from "@/app/authentication/state";
import { Socket } from "socket.io-client";
import { Messenger } from "@/app/chat/types";
import axios from "axios";

export function UserSearch({ socket }: { socket: Socket }) {
  const form = useForm<{ username: string }>();
  const [messengers, setMessengers] = useRecoilState(messengerArrayState);
  const setChatId = useSetRecoilState(chatIdState);
  const user = useRecoilValue(userDataState);

  const searchUser = (searchedUser: string) => {
    socket.emit("find_user", searchedUser);
  };

  const createNewChat = async (messengerId: string) => {
    try {
      const response = await axios.post("/api/chat/chat", {
        userId: user.id,
        messengerId,
      });
      console.log(response);
      setChatId(response.data.chatId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const onSubmit = ({ username }: { username: string }) => {
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
    const handleGetMessenger = ({ messengerId, username }: Messenger) => {
      setMessengers((prevValue) => [
        ...prevValue,
        {
          messengerId,
          username,
          isActive: true,
        },
      ]);

      createNewChat(messengerId);
    };

    if (socket) {
      socket.on("get_user", handleGetMessenger);
    }

    return () => {
      socket.off("get_user", handleGetMessenger);
    };
  }, []);

  return (
    <div className="w-full absolute bottom-0 py-3">
      <FormProvider {...form}>
        <form
          id="search-user-form"
          className="flex flex-col items-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TextInput
            type="text"
            placeholder="Find a user..."
            name="username"
            isDarkThemed
          />
          <button className="bg-gradient-to-br from-main-red to-main-orange text-whitesmoke rounded-full py-2 px-[5.4rem] my-2">
            Search
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
