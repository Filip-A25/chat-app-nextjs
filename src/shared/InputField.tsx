"use client";

import { InputHTMLAttributes, useMemo } from "react";
import { useFormContext, RegisterOptions, FieldValues } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  validation?: RegisterOptions<FieldValues>;
}

export function InputField({ label, name, validation, ...props }: Props) {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const errorMessage = useMemo(() => {
    if (errors[name]) return errors[name].message;
  }, [errors, name]);

  return (
    <div className="py-2">
      <label className="text-md md:text-lg flex flex-col py-2 px-1">
        {label}
      </label>
      <input
        {...register(name, { ...validation })}
        {...props}
        className="outline-none text-sm md:text-md rounded-full border px-3 py-2 w-80"
      />
      {errorMessage && (
        <p className="text-main-red text-xs">* {errorMessage.toString()}</p>
      )}
    </div>
  );
}
