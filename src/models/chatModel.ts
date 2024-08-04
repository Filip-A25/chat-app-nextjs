import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/database/sequelize";

class Chat extends Model {
    static async createChat() {
        try {
            return await Chat.create();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

Chat.init({}, {
    sequelize,
    modelName: "Chat",
    tableName: "chats",
    timestamps: false
})

export {Chat};