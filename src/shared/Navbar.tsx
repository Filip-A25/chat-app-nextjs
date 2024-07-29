"use client";

import Link from "next/link";
import Image from "next/image";
import { paths } from "@/app/types";
import paperIcon from "@/assets/paper-plane-icon-light.png";

export function Navbar() {
  return (
    <nav className="h-[50px] sm:h-[40px] bg-main-grey w-screen px-5 sm:px-12 flex items-center justify-between">
      <section>
        <Link href={paths.home} className="flex group group-hover:transition">
          <Image
            src={paperIcon}
            alt="Chat App Logo"
            width={20}
            className="mr-3 group-hover:animate-navbarLogoSpinAnimation group-hover:transition transition"
          />
          <span className="text-whitesmoke group-hover:translate-x-2 group-hover:transition transition">
            Chat APP
          </span>
        </Link>
      </section>
      <section className="flex justify-between w-32 sm:w-36">
        <Link
          href={paths.register}
          className="text-whitesmoke transition hover:text-red-400 hover:transition"
        >
          Register
        </Link>
        <Link
          href={paths.login}
          className="text-whitesmoke hover:text-red-400 hover:transition"
        >
          Login
        </Link>
      </section>
    </nav>
  );
}
