import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  userId: string;
  username: string;
  isActive?: boolean;
}

export function UserCard({ userId, username, isActive }: Props) {
  console.log(userId, username, isActive);

  return (
    <button className={clsx("w-full", isActive && "bg-[#434343]")}>
      <li className="flex py-3 px-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-main-red to-main-orange"></div>
        <div className="flex items-center px-4">
          <span
            className={clsx("text-whitesmoke", isActive && "font-semibold")}
          >
            {username}
          </span>
        </div>
      </li>
    </button>
  );
}
