import { atom } from "recoil";

export const publicRoutesState = atom({
    key: "publicRoutesState",
    default: ["/", "/authentication/login", "/authentication/register"]
})

export const privateRoutesState = atom({
    key: "privateRoutesState",
    default: ["/my-chats", "/my-profile"]
})