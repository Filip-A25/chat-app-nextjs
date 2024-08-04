import {DataTypes, Model} from "sequelize";
import { sequelize } from "@/database/sequelize";
import { Message } from "@/app/chat/types/messageType";

class ChatMessage extends Model {
    static async createChatMessage({chatId, userId, message}: Message) {
        try {
            return await ChatMessage.create({chat_id: chatId, user_id: userId, message});            
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

ChatMessage.init({
    chat_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    user_id: {
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
    }
}, {
    sequelize,
    modelName: "ChatMessage",
    tableName: "chat_messages"
});

export {ChatMessage};