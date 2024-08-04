import { DateDataType } from "sequelize";

export interface ChatMessage {
    username: string;
    message: string;
    timestamp: DateDataType;
}