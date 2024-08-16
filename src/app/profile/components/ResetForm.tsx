import { useForm, FormProvider } from "react-hook-form";
import { InputField } from "@/app/authentication/components";
import { validation } from "@/app/authentication/const/authRequirements";
import { Button } from "@/shared";
import { UserTokenData } from "@/app/authentication/types";
import { emailType } from "@/app/types";
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
        email: user.email,
        userId: user.id,
        type: emailType.reset,
      });
      console.log(response);
      notifySuccessMessage("E-mail for password reset has been sent.");
      setIsFormOpen(true);
    } catch (error: any) {
      notifyErrorMessage("Something went wrong, please try again.");
      throw new Error(error.message);
    }
  };

  return (
    <FormProvider {...form}>
      <form id="reset-password-form" onSubmit={form.handleSubmit(resetSubmit)}>
        <InputField
          label="Enter your current password"
          name="currentPassword"
          validation={validation.password}
        />
        <InputField
          label="Enter your new password"
          name="newPassword"
          validation={validation.password}
        />
        <Button title="Reset password" theme="secondary" />
      </form>
    </FormProvider>
  );
}
