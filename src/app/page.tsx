"use client";

import { Button } from "@/shared";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <section className="h-[calc(100vh-65px)] pt-[65px] flex flex-col justify-center items-center">
      <div className="text-center pb-10">
        <h1 className="text-4xl py-2">
          Welcome to the Chat App using NextJS 14.
        </h1>
        <span className="text-3xl">Get started messaging!</span>
      </div>
      <Button
        title="Create a new account"
        theme="primary"
        handleClick={() => router.push("/authentication/register")}
      />
    </section>
  );
}
