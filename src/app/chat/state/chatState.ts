import {atom} from "recoil";

export const chatIdState = atom<string>({
    key: "chat.chatIdState",
    default: undefined
})