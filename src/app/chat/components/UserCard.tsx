import { ButtonHTMLAttributes } from "react";
import { useRecoilState } from "recoil";
import { messengerArrayState } from "../state";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  userId: string;
  username: string;
  isActive?: boolean;
}

export function UserCard({ userId, username, isActive }: Props) {
  const [messengers, setMessengers] = useRecoilState(messengerArrayState);

  const handleMessengerSelect = () => {
    const newMessengersArray = messengers.map((messenger) => {
      if (messenger.messengerId === userId) {
        return { ...messenger, isActive: true };
      } else return { ...messenger, isActive: false };
    });

    setMessengers(newMessengersArray);
  };

  return (
    <button
      className={clsx("w-full", isActive && "bg-[#434343]")}
      onClick={handleMessengerSelect}
    >
      <li className="flex py-3 px-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-main-red to-main-orange" />
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
