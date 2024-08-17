"use client";

import { useForm, FormProvider } from "react-hook-form";
import { InputField } from "@/app/authentication/components";
import { validation } from "@/app/authentication/const/authRequirements";
import { Button } from "@/shared";
import { UserTokenData } from "@/app/authentication/types";
import { notifySuccessMessage, notifyErrorMessage } from "@/app/utils";
import axios from "axios";

interface Props {
  user: UserTokenData;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ResetData {
  currentPassword: string;
  newPassword: string;
}

export function ResetForm({ user, setIsFormOpen }: Props) {
  const form = useForm<ResetData>();

  const resetSubmit = async (data: ResetData) => {
    try {
      const response = await axios.post("/api/profile/resetPassword", {
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

  return (
    <FormProvider {...form}>
      <form id="reset-password-form" onSubmit={form.handleSubmit(resetSubmit)}>
        <h1 className="text-3xl font-semibold">Change your password</h1>
        <div className="py-4">
          <InputField
            label="Current password"
            name="currentPassword"
            type="password"
            placeholder="Enter your current password..."
            validation={validation.password}
          />
          <InputField
            label="New password"
            name="newPassword"
            type="password"
            placeholder="Enter your new password..."
            validation={validation.password}
          />
        </div>
        <Button title="Reset password" theme="secondary" />
      </form>
    </FormProvider>
  );
}
