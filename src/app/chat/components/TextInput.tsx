import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isWide?: boolean;
  isDarkThemed?: boolean;
}

export function TextInput({
  type,
  placeholder,
  value,
  onChange,
  isWide,
  isDarkThemed,
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        "my-1 rounded-full outline-none px-4 py-2",
        isWide && "flex-grow",
        isDarkThemed ? "bg-main-grey text-whitesmoke" : "bg-[#f2f2f2]"
      )}
    />
  );
}
