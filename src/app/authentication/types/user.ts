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