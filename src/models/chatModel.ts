import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/database/sequelize";

class Chat extends Model {}

Chat.init({
    user_id: {
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