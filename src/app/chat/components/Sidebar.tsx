import { ChatCard } from "./ChatCard";

export function Sidebar() {
  return (
    <section className="absolute left-0 top-0 h-full w-[20vw] bg-[#353535]">
      <header>
        <h1 className="py-3 px-8 text-xl font-semibold text-whitesmoke">
          Chats
        </h1>
      </header>
      <ul className="py-4">
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </ul>
    </section>
  );
}
