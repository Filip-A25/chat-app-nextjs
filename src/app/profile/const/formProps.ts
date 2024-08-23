import { validation } from "@/app/authentication/const/authRequirements"

export const formProps = {
    username: {
        formId: "change-username-form",
        title: "Change your username",
        input: {
            label: "Current username",
            name: "currentUsername",
            type: "text",
            placeholder: "Enter your current username...",
            validation: validation.username
        },
        confirmInput: {
            label: "New username",
            name: "newUsername",
            type: "text",
            placeholder: "Enter your new username...",
            validation: validation.username
        },
        buttonTitle: "Change username"
    },
    password: {
        formId: "reset-password-form",
        title: "Change your password",
        input: {
            label: "Current password",
            name: "currentPassword",
            type: "password",
            placeholder: "Enter your current password...",
            validation: validation.password
        },
        confirmInput: {
            label: "New password",
            name: "newPassword",
            type: "password",
            placeholder: "Enter your new password...",
            validation: validation.password
        },
        buttonTitle: "Reset password"
    }
}