import { useMemo } from "react";
import { ChatMessage } from "../types";
import { userDataState } from "@/app/authentication/state";
import { useRecoilValue } from "recoil";
import clsx from "clsx";

export function MessageCard({ username, message, timestamp }: ChatMessage) {
  const user = useRecoilValue(userDataState);

  const isOwnMessage = useMemo(
    () => user.username === username,
    [user, username]
  );

  return (
    <div className={clsx("py-1", isOwnMessage && "text-right")}>
      <span
        className={clsx(
          "mx-3 px-3 py-2 rounded-full inline-block max-w-full",
          isOwnMessage
            ? "bg-[#eeeeee]"
            : "bg-gradient-to-br from-main-orange to-main-red text-whitesmoke"
        )}
        style={{
          wordWrap: "break-word",
          maxWidth: "70%",
        }}
      >
        {message}
      </span>
    </div>
  );
}
