import {toast} from "react-toastify";

export const notifyCreateAccount = () => {
    toast.success("Account successfully created.");
}

export const notifyLoggedIn = () => {
    toast.success("Successfully logged in.");
}

export const notifyLoggedOut = () => {
    toast.success("Successfully logged out.");
}

export const notifyErrorMessage = (message: string) => {
    toast.error(message);
}