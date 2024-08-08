import { UserCard, UserSearch } from "./";
import { useRecoilValue } from "recoil";
import { messengerArrayState } from "@/app/chat/state";
import { Socket } from "socket.io-client";

export function Sidebar({ socket }: { socket: Socket }) {
  const messengersArray = useRecoilValue(messengerArrayState);

  return (
    <section className="absolute left-0 top-0 h-full hidden md:block md:w-[30vw] lg:w-[25vw] xl:w-[20vw] bg-[#353535]">
      <header className="py-3 text-center">
        <h1 className="py-1 px-8 text-xl font-semibold text-whitesmoke">
          Chats
        </h1>
      </header>
      <ul>
        {Boolean(messengersArray.length) ? (
          messengersArray.map(({ userId, username, isActive }, index) => (
            <UserCard
              key={index}
              userId={userId}
              username={username}
              isActive={isActive}
            />
          ))
        ) : (
          <div className="px-8 text-center py-6">
            <span className="text-[#7a7a7a]">
              You aren not chatting to anybody.
            </span>
          </div>
        )}
      </ul>
      <UserSearch socket={socket} />
    </section>
  );
}
