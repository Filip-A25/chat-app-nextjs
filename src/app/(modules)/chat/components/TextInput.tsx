import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  isWide?: boolean;
  isDarkThemed?: boolean;
}

export function TextInput({
  type,
  placeholder,
  value,
  name,
  onChange,
  isWide,
  isDarkThemed,
}: Props) {
  const { register } = useFormContext();

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      {...register(name)}
      onChange={onChange}
      className={clsx(
        "my-1 rounded-full outline-none px-4 py-2",
        isWide && "flex-grow",
        isDarkThemed ? "bg-main-grey text-whitesmoke" : "bg-[#f2f2f2]"
      )}
    />
  );
}
