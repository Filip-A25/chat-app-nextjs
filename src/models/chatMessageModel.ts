import {DataTypes, Model} from "sequelize";
import { sequelize } from "@/database/sequelize";
import { Message } from "@/app/chat/types/messageType";

class ChatMessage extends Model {
    static async createChatMessage({chatId, senderId, message}: Message) {
        try {
            return await ChatMessage.create({from: senderId, message, chat_id: chatId});            
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

ChatMessage.init({
    from: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        field: "created_at"
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at"
    },
    chat_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,
    modelName: "ChatMessage",
    tableName: "chat_messages"
});

export {ChatMessage};