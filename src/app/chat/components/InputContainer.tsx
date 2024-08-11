import { Socket } from "socket.io-client";
import { TextInput } from "./";
import { useForm, FormProvider } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { activeMessengerState } from "@/app/chat/state";

export function InputContainer({ socket }: { socket: Socket }) {
  const form = useForm<{ message: string }>();
  const messenger = useRecoilValue(activeMessengerState);

  const onSubmit = ({ message }: { message: string }) => {
    socket.emit("private_message", {
      message,
      receiverId: messenger?.messengerId,
      chatId: messenger?.chatId,
    });
  };

  return (
    <div className="absolute bottom-0 w-full px-3 sm:px-10 py-2 sm:py-4">
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
              name="message"
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
