"use client";

import { InputHTMLAttributes } from "react";
import { useFormContext, RegisterOptions, FieldValues } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  validation: RegisterOptions<FieldValues>;
}

export function InputField({ label, name, validation, ...props }: Props) {
  const { register } = useFormContext();

  return (
    <label>
      {label}
      <input {...register(name, validation)} {...props} />
    </label>
  );
}
