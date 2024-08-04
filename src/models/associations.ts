import { Chat, ChatLine, User } from "./";

User.hasMany(ChatLine, {
    foreignKey: {
        name: "user_id",
        allowNull: false
    }
});
ChatLine.belongsTo(User, {
    foreignKey: {
        name: "user_id",
        allowNull: false
    }
});

Chat.hasMany(ChatLine, {
    foreignKey: {
        name: "chat_id",
        allowNull: false
    }
});
ChatLine.belongsTo(Chat, {
    foreignKey: {
        name: "chat_id",
        allowNull: false
    }
});

export {User, Chat, ChatLine};