import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isWide?: boolean;
}

export function TextInput({
  type,
  placeholder,
  value,
  onChange,
  isWide,
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        "mr-5 my-1 rounded-full outline-none bg-[#f2f2f2] px-4 py-2",
        isWide && "flex-grow"
      )}
    />
  );
}
