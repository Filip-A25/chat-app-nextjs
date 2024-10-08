import { atom } from "recoil";

export const publicRoutesState = atom({
    key: "publicRoutesState",
    default: ["/", "/error", "/authentication/login", "/authentication/register", "/authentication/verifyEmail", "/authentication/resetPassword"]
})

export const privateRoutesState = atom({
    key: "privateRoutesState",
    default: ["/error", "/chat/my-chats", "/profile"]
})