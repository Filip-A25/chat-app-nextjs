import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  theme: "primary" | "secondary";
  handleClick?: VoidFunction;
}

export function Button({ title, theme, handleClick }: Props) {
  const themeClasses =
    theme === "primary"
      ? "bg-gradient-to-br from-main-red to-main-orange text-whitesmoke"
      : "bg-main-grey border-1 text-whitesmoke";

  return (
    <button className={`${themeClasses} standard-button`} onClick={handleClick}>
      {title}
    </button>
  );
}
