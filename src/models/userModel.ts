import {DataTypes, Model} from "sequelize";
import {UserModel} from "@/app/(modules)/authentication/types";
import { sequelize } from "@/database/sequelize";

class User extends Model {
    static async createUser({username, email, password}: UserModel) {
        try {
            return await User.create({username, email, password});
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async updateUserWithId({id, data}: any) {
        try {
            return await User.update(data, {
                where: {
                    id: id
                }
            })
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async updateUserWithEmail({email, data}: any) {
        try {
            return await User.update(data, {
                where: {
                    email: email
                }
            })
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async findUserWithId(id: string) {
        try {
            return await User.findOne({where: {id: id}});
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async findUserWithEmail(email: string) {
        try {
            return await User.findOne({where: {email: email}});
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async findUserWithVerifyToken(token: string) {
        try {
            return await User.findOne({where: {verify_token: token}});
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async deleteUser(id: string) {
        try {
            return await User.destroy({where: {id: id}});
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

User.init({
    username: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }    
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING(72),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    verify_token: {
        type: DataTypes.STRING(300),
        unique: true,
        defaultValue: null
    },
    forget_password_token: {
        type: DataTypes.STRING(300),
        unique: true,
        defaultValue: null
    },
    verify_token_expiry: {
        type: DataTypes.DATE,
        unique: true,
        defaultValue: null
    },
    forget_password_token_expiry: {
        type: DataTypes.DATE,
        unique: true,
        defaultValue: null
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
    modelName: "User",
    tableName: "users"
});

export {User};