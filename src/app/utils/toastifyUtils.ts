import {toast} from "react-toastify";

export const notifyCreateAccount = () => {
    toast.success("Account successfully created.");
}

export const notifyLoggedIn = () => {
    toast.success("Successfully logged in.");
}

export const notifySuccessMessage = (message: string) => {
    toast.success(message);
} 

export const notifyErrorMessage = (message: string) => {
    toast.error(message);
}