export interface UserData {
    username: string;
    email: string;
    password: string;
}

export interface UserModel extends UserData {
    verified?: boolean;
    admin?: boolean;
    verifyToken?: string;
    forgetPasswordToken?: string;
}

export interface UserTokenData {
    id: string;
    username: string;
    email: string;
    socketSessionId?: string;
}