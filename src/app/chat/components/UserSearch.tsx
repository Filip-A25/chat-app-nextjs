import { useForm, FormProvider } from "react-hook-form";
import { TextInput } from "./";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { messengerArrayState, chatIdState } from "@/app/chat/state";
import { userDataState } from "@/app/authentication/state";
import { Socket } from "socket.io-client";

export function UserSearch({ socket }: { socket: Socket }) {
  const form = useForm<{ username: string }>();
  const setMessenger = useSetRecoilState(messengerArrayState);
  const setChatId = useSetRecoilState(chatIdState);
  const setUserInChat = useSetRecoilState(userDataState);

  const searchUser = async (searchedUser: string) => {
    try {
      const response = await axios.get("/api/chat/searchUser", {
        params: { username: searchedUser },
      });
      console.log(response);
      setMessenger((prev) => [
        ...prev,
        {
          userId: response.data.userId,
          username: response.data.username,
          isActive: true,
        },
      ]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const createNewChat = async () => {
    try {
      const response = await axios.post("/api/chat/chat");
      setChatId(response.data.chatId);
      socket.emit("join_chat", response.data.chatId);
      setUserInChat((rest) => ({
        ...rest,
        activeChatRoom: response.data.chatId,
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const onSubmit = async ({ username }: { username: string }) => {
    await searchUser(username);
    createNewChat();
  };

  return (
    <div className="w-full absolute bottom-0 py-3">
      <FormProvider {...form}>
        <form
          id="search-user-form"
          className="flex flex-col items-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TextInput type="text" placeholder="Find a user..." isDarkThemed />
          <button className="bg-gradient-to-br from-main-red to-main-orange text-whitesmoke rounded-full py-2 px-[5.4rem] my-2">
            Search
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
