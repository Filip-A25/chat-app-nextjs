"use client";

import { FormProvider } from "react-hook-form";
import { InputField } from "@/shared";
import { Button } from "@/shared";
import { ResetFormProps } from "../types";

import { useResetForm } from "../hooks";

export function ResetForm({ formType, user, setIsFormOpen }: ResetFormProps) {
  const { form, properties, resetSubmit } = useResetForm({
    formType,
    user,
    setIsFormOpen,
  });

  return (
    <FormProvider {...form}>
      <form id={properties.formId} onSubmit={form.handleSubmit(resetSubmit)}>
        <h1 className="text-3xl font-semibold">{properties.title}</h1>
        <div className="py-4">
          <InputField
            label={properties.input.label}
            name={properties.input.name}
            type={properties.input.type}
            placeholder={properties.input.placeholder}
            validation={{
              ...properties.input.validation,
              validate: {
                value: (value) => {
                  if (formType === "changeUsername") {
                    return (
                      value === user.username || "Incorrect username entered."
                    );
                  }
                  return true;
                },
              },
            }}
          />
          <InputField
            label={properties.confirmInput.label}
            name={properties.confirmInput.name}
            type={properties.confirmInput.type}
            placeholder={properties.confirmInput.placeholder}
            validation={{
              ...properties.confirmInput.validation,
              validate: {
                value: (value) => {
                  if (formType === "changeUsername") {
                    return (
                      value !== user.username ||
                      "New username cannot be the same as the current one."
                    );
                  }
                  return true;
                },
              },
            }}
          />
        </div>
        <Button title={properties.buttonTitle} theme="secondary" />
      </form>
    </FormProvider>
  );
}
