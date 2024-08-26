import { FormProvider } from "react-hook-form";
import { TextInput } from ".";
import { Socket } from "socket.io-client";
import { useSearchUser } from "@/app/(modules)/chat/hooks";

export function UserSearch({ socket }: { socket: Socket }) {
  const { form, onSubmit } = useSearchUser(socket);

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
