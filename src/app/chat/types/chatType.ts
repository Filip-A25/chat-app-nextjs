import { DateDataType } from "sequelize";

export interface ChatMessage {
    username: string;
    message: string;
}

export interface ChatMessageData extends ChatMessage {
    chatId: string;
    timestamp?: DateDataType;
}

export interface ReceivedMessage {
    senderId: string;
    senderUsername: string;
    message: string;
    chatId: string; 
}

export interface Messenger {
    messengerId: string;
    username: string;
    chatId?: string;
    messages?: ChatMessage[];
    isActive?: boolean;
}

export interface Chat {
    chatId: string;
    messages?: ChatMessage[];
}