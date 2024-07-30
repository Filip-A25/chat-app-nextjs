"use client";

import Image from "next/image";
import Link from "next/link";
import errorIcon from "@/assets/error-icon.png";
import { loggedState } from "@/app/authentication/state";
import { useRecoilValue } from "recoil";
import { paths } from "@/app/types";

export default function ErrorPage() {
  const isLoggedIn = useRecoilValue(loggedState);

  return (
    <section className="h-full flex flex-col justify-center items-center max-sm:px-4">
      <div className="flex items-center">
        <Image
          src={errorIcon}
          alt="Error Icon"
          className="w-[85px] md:w-[100px] pr-3"
        />
        <h1 className="text-2xl md:text-3xl">
          <b>ERROR:</b> Something went wrong...
        </h1>
      </div>
      <Link
        href={isLoggedIn ? paths.myChats : paths.home}
        className="max-sm:mt-5 text-lg text-red-500"
      >
        {isLoggedIn ? "Go to my chats." : "Go to homepage."}
      </Link>
    </section>
  );
}
