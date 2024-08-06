import { DateDataType } from "sequelize";

export interface ChatMessage {
    username: string;
    message: string;
    timestamp: DateDataType;
}

export interface Messenger {
    userId: string;
    username: string;
    isActive?: boolean;
}