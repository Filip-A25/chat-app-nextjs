import { useChatMessage } from "@/app/chat/hooks";
import { Socket } from "socket.io-client";
import { TextInput } from "./";

interface Props {
  socket: Socket;
}

export function InputContainer({ socket }: Props) {
  const {
    handleMessageSubmit,
    handleSearchChange,
    handleMessageChange,
    searchedUsername,
    message,
  } = useChatMessage({ socket });

  return (
    <div className="w-[calc(100vw-20vw)] absolute right-0 bottom-0 px-5 py-4">
      <form
        id="message-form"
        onSubmit={handleMessageSubmit}
        className="flex flex-col"
      >
        <span>
          <label className="mr-3">Send to:</label>
          <TextInput
            type="text"
            placeholder="Enter a receiver..."
            value={searchedUsername}
            onChange={handleSearchChange}
          />
        </span>
        <span className="flex items-center justify-between">
          <TextInput
            type="text"
            placeholder="Write your message here..."
            value={message}
            onChange={handleMessageChange}
            isWide
          />
          <button className="bg-gradient-to-br from-main-red to-main-orange rounded-full py-2 px-3">
            <span className="invert">➤</span>
          </button>
        </span>
      </form>
    </div>
  );
}
