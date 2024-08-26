import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  theme: "primary" | "secondary";
  handleClick?: VoidFunction;
  isAnimated?: boolean;
}

export function Button({ title, theme, handleClick, isAnimated }: Props) {
  const themeClasses =
    theme === "primary"
      ? "bg-gradient-to-br from-main-red to-main-orange text-whitesmoke"
      : "bg-main-grey border-1 text-whitesmoke";

  return (
    <button
      className={clsx(
        `${themeClasses} standard-button`,
        isAnimated &&
          "hover:shadow-md transition hover:transition hover:-translate-y-1"
      )}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}
