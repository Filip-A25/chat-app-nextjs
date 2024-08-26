import { UserTokenData } from "@/app/(modules)/authentication/types";

export interface ResetFormProps {
    formType: "changeUsername" | "resetPassword";
    user: UserTokenData;
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}