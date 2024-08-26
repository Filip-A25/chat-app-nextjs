import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { notifySuccessMessage, notifyErrorMessage } from "@/app/utils";
import { ResetFormProps } from "../types";
import { formProps } from "../const";

interface ChangeUsernameData {
  currentUsername: string;
  newUsername: string;
}

interface ResetPasswordData {
  currentPassword: string;
  newPassword: string;
}

export function useResetForm({
  formType,
  user,
  setIsFormOpen,
}: ResetFormProps) {
  const form = useForm<Record<string, string>>();
  const properties =
    formType === "changeUsername" ? formProps.username : formProps.password;
  const router = useRouter();

  const resetTokenData = async () => {
    try {
      const response = await axios.get("/api/authentication/resetToken", {
        params: { userId: user.id },
      });
      window.location.reload();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const changeUsernameSubmit = async (data: ChangeUsernameData) => {
    try {
      await axios.post("/api/profile/changeUsername", {
        userId: user.id,
        username: data.newUsername,
      });
      notifySuccessMessage("Username has been successfully changed.");
      await resetTokenData();
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

  return { form, properties, resetSubmit };
}
