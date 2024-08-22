import {atom, selector} from "recoil";
import { Chat } from "../types";
import { activeMessengerState } from "./messengerState";

export const chatState = atom<Chat[]>({
    key: "chat.chatState",
    default: []
})

export const activeChatState = selector<Chat | undefined>({
    key: "chat.activeChatState",
    get: ({get}) => {
        const activeMessenger = get(activeMessengerState);
        const chats = get(chatState);

        const activeChat = chats.find(chat => chat.chatId === activeMessenger?.chatId);
        return activeChat;
    }
})