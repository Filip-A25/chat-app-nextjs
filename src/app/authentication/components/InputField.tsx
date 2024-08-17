"use client";

import { InputHTMLAttributes } from "react";
import { useFormContext, RegisterOptions, FieldValues } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  validation?: RegisterOptions<FieldValues>;
}

export function InputField({ label, name, validation, ...props }: Props) {
  const { register } = useFormContext();

  return (
    <div className="py-2">
      <label className="text-lg md:text-xl flex flex-col py-2 px-1">
        {label}
      </label>
      <input
        {...register(name, validation)}
        {...props}
        className="outline-none text-sm md:text-lg rounded-full border px-3 py-2 w-80"
      />
    </div>
  );
}
