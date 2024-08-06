import { Socket } from "socket.io-client";
import { TextInput } from "./";
import { useForm, FormProvider } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { chatIdState } from "@/app/chat/state";
import { userDataState } from "@/app/authentication/state";

export function InputContainer({ socket }: { socket: Socket }) {
  const form = useForm<{ message: string }>();
  const chatId = useRecoilValue(chatIdState);
  const user = useRecoilValue(userDataState);

  const onSubmit = async ({ message }: { message: string }) => {
    try {
      await socket.emit("send_message", { chatId, userId: user.id, message });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="absolute bottom-0 w-full px-3 sm:px-5 py-2 sm:py-4">
      <FormProvider {...form}>
        <form
          id="message-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <span className="flex items-center justify-between">
            <TextInput
              type="text"
              placeholder="Write your message here..."
              isWide
            />
            <button className="bg-gradient-to-br from-main-red to-main-orange rounded-full py-2 px-3 ml-4">
              <span className="invert brightness-0">➤</span>
            </button>
          </span>
        </form>
      </FormProvider>
    </div>
  );
}
