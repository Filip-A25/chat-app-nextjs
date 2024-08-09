import Image from "next/image";
import paperIcon from "@/assets/paper-plane-icon-dark.png";
import clsx from "clsx";

export function PageLoading({ isFullScreen }: { isFullScreen?: boolean }) {
  return (
    <section
      className={clsx(
        isFullScreen && "h-screen flex flex-col justify-center items-center"
      )}
    >
      <Image
        src={paperIcon}
        alt="Chat APP Icon"
        width={isFullScreen ? 75 : 50}
        className="opacity-10 animate-pulse h-auto"
      />
    </section>
  );
}
