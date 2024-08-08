import { Chat, ChatMessage, User } from "./";

User.hasMany(ChatMessage, {
    foreignKey: {
        name: "from",
        allowNull: false
    }
});

User.hasMany(Chat, {
    foreignKey: {
        name: "user_id",
        allowNull: false        
    }
});

User.hasMany(Chat, {
    foreignKey: {
        name: "messenger_id",
        allowNull: false
    }
});

Chat.belongsTo(User, {
    foreignKey: {
        name: "user_id",
        allowNull: false
    }
});

Chat.belongsTo(User, {
    foreignKey: {
        name: "messenger_id",
        allowNull: false
    }
});

ChatMessage.belongsTo(User, {
    foreignKey: {
        name: "from",
        allowNull: false
    }
});

Chat.hasMany(ChatMessage, {
    foreignKey: {
        name: "chat_id",
        allowNull: false
    }
});

ChatMessage.belongsTo(Chat, {
    foreignKey: {
        name: "chat_id",
        allowNull: false
    }
});

export {User, Chat, ChatMessage};