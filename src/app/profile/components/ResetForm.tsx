"use client";

import { useForm, FormProvider } from "react-hook-form";
import { InputField } from "@/shared";
import { Button } from "@/shared";
import { UserTokenData } from "@/app/authentication/types";
import { notifySuccessMessage, notifyErrorMessage } from "@/app/utils";
import axios from "axios";
import { formProps } from "../const/formProps";

interface Props {
  formType: "changeUsername" | "resetPassword";
  user: UserTokenData;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChangeUsernameData {
  currentUsername: string;
  newUsername: string;
}

interface ResetPasswordData {
  currentPassword: string;
  newPassword: string;
}

export function ResetForm({ formType, user, setIsFormOpen }: Props) {
  const form = useForm<Record<string, string>>();
  const properties =
    formType === "changeUsername" ? formProps.username : formProps.password;

  const changeUsernameSubmit = async (data: ChangeUsernameData) => {
    try {
      await axios.post("/api/profile/changeUsername", {
        userId: user.id,
        username: data.newUsername,
      });
      notifySuccessMessage("Username has been successfully changed.");
      setIsFormOpen(false);
    } catch (error: any) {
      notifyErrorMessage("Something went wrong, please try again.");
      throw new Error(error.message);
    }
  };

  const resetPasswordSubmit = async (data: ResetPasswordData) => {
    try {
      await axios.post("/api/profile/resetPassword", {
        userId: user.id,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      notifySuccessMessage("Password has been successfully reset.");
      setIsFormOpen(false);
    } catch (error: any) {
      notifyErrorMessage("Something went wrong, please try again.");
      throw new Error(error.message);
    }
  };

  const resetSubmit = (data: Record<string, string>) => {
    if (formType === "changeUsername") {
      return changeUsernameSubmit({
        currentUsername: data.currentUsername,
        newUsername: data.newUsername,
      });
    }
    resetPasswordSubmit({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

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
