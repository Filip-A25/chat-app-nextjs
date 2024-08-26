import { ReturnButton } from ".";

export function ChatHeader({ username }: { username: string }) {
  return (
    <section className="w-full absolute right-0 top-0 py-3 px-4 sm:px-8 shadow-sm flex">
      <ReturnButton />
      <h1 className="w-fit px-5 py-1 mx-2 rounded-full text-lg font-semibold bg-whitesmoke">
        {username}
      </h1>
    </section>
  );
}
