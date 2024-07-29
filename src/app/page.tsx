"use client";

import { Button } from "@/shared";
import { useRouter } from "next/navigation";
import paperIcon from "@/assets/paper-plane-icon-dark.png";
import Image from "next/image";
import { paths } from "@/app/types";

export default function Home() {
  const router = useRouter();

  return (
    <section className="min-h-[calc(100vh-50px)] sm:min-h-[calc(100vh-40px)] px-10 sm:px-0 flex flex-col justify-center items-center bg-gradient-to-br from-main-red to-main-orange">
      <div>
        <section className="flex max-sm:justify-center pb-5">
          <Image
            src={paperIcon}
            alt="Chat App Logo"
            width={75}
            className="mr-4"
          />
          <h1 className="font-[500] text-4xl md:text-5xl leading-loose md:leading-relaxed">
            Chat APP
          </h1>
        </section>
        <section className="max-sm:flex max-sm:flex-col max-sm:items-center">
          <div className="pb-10 max-sm:text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl py-2">
              Welcome to the Chat App using NextJS 14.
            </h1>
            <span className="text-xl md:text-2xl lg:text-3xl">
              Get started messaging!
            </span>
          </div>
          <Button
            title="Create a new account"
            theme="secondary"
            handleClick={() => router.push(paths.login)}
          />
        </section>
      </div>
    </section>
  );
}
