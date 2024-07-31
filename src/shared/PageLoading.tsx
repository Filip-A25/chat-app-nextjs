import Image from "next/image";
import paperIcon from "@/assets/paper-plane-icon-dark.png";

export function PageLoading() {
  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <Image
        src={paperIcon}
        alt="Chat APP Icon"
        width={75}
        className="opacity-10 animate-pulse h-auto"
      />
    </section>
  );
}
