import {DataTypes, Model} from "sequelize";
import { sequelize } from "@/database/sequelize";

class ChatLine extends Model {}

ChatLine.init({
    chat_id: {
        type: DataTypes.INTEGER,
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
        field: "timestamp"
    }
}, {
    sequelize,
    modelName: "ChatLine",
    tableName: "chat_lines"
});

export {ChatLine};