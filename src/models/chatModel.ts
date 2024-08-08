import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/database/sequelize";

interface Props {
    userId: string;
    messengerId: string;
}

class Chat extends Model {
    static async createChat({userId, messengerId}: Props) {
        try {
            return await Chat.create({user_id: userId, messenger_id: messengerId});
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

Chat.init({
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    messenger_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,
    modelName: "Chat",
    tableName: "chats",
    timestamps: false
})

export {Chat};