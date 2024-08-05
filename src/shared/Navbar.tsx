"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { paths } from "@/app/types";
import paperIcon from "@/assets/paper-plane-icon-light.png";
import { loggedState } from "@/app/authentication/state";
import { useRecoilState } from "recoil";
import { notifyErrorMessage, notifyLoggedOut } from "@/app/utils/utils";
import axios from "axios";
import clsx from "clsx";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedState);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/authentication/logout");
      setIsLoggedIn(false);
      notifyLoggedOut();
      router.push("/");
    } catch (error: any) {
      notifyErrorMessage(error.message);
      throw new Error(error.message);
    }
  };

  return (
    <nav className="h-[50px] sm:h-[40px] bg-main-grey w-screen px-5 sm:px-8 flex items-center justify-between">
      <section>
        <Link href={paths.home} className="flex group group-hover:transition">
          <Image
            src={paperIcon}
            alt="Chat App Logo"
            width={20}
            className="mr-3 h-auto group-hover:animate-navbarLogoSpinAnimation group-hover:transition transition"
          />
          <span className="text-whitesmoke group-hover:translate-x-2 group-hover:transition transition">
            Chat APP
          </span>
        </Link>
      </section>
      <section
        className={clsx(
          "flex w-32 sm:w-36",
          isLoggedIn ? "justify-end" : "justify-between"
        )}
      >
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-whitesmoke hover:text-red-400 hover:transition"
          >
            Logout
          </button>
        ) : (
          <>
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
          </>
        )}
      </section>
    </nav>
  );
}
