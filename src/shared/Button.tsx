import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  theme: "primary" | "secondary";
  handleClick?: VoidFunction;
}

export function Button({ title, theme, handleClick }: Props) {
  const themeClasses =
    theme === "primary" ? "bg-orange-600 text-white font-[500]" : "";

  return (
    <button className={`${themeClasses} standard-button`} onClick={handleClick}>
      {title}
    </button>
  );
}
