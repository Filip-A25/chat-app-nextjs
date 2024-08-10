import { DateDataType } from "sequelize";

export interface ChatMessage {
    username: string;
    message: string;
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
    isActive?: boolean;
    messages?: ChatMessage[];
    chatId?: string;
}