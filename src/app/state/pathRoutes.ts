import { atom } from "recoil";

export const publicRoutesState = atom({
    key: "publicRoutesState",
    default: ["/", "/authentication/login", "/authentication/register", "/authentication/verifyEmail", "/authentication/resetPassword"]
})

export const privateRoutesState = atom({
    key: "privateRoutesState",
    default: ["/my-chats", "/my-profile"]
})