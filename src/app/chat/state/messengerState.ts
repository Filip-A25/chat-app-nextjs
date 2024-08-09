import { atom, selector } from "recoil";
import { Messenger } from "@/app/chat/types";

export const messengerArrayState = atom<Messenger[]>({
    key: "chat.messengerArrayState",
    default: []
})

export const activeMessengerState = selector<Messenger | undefined>({
    key: "chat.activeMessengerState",
    get: ({get}) => {
        const messengers = get(messengerArrayState);
        return messengers?.find(messenger => messenger.isActive);
    }
})

export const messengerFetchingState = atom({
    key: "chat.messengerFetchingState",
    default: true
})