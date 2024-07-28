import {User} from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import {emailType} from "@/app/types/mailType";

interface Props {
    email: string;
    userId: string;
    type: emailType 
}

export const sendMail = async ({email, userId, type}: Props) => {
    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10);

        if (type === emailType.verify) {
            await User.updateUserWithId({id: userId, data: {
                verify_token: hashToken,
                verify_token_expiry: Date.now() + 3600000
            }})
        }

        if (type === emailType.reset) {
            await User.updateUserWithId({id: userId, data: {
                forget_password_token: hashToken,
                forget_password_token_expiry: Date.now() + 3600000 
            }})
        }

        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST!.toString(),
            port: Number(process.env.NODEMAILER_PORT!),
            auth: {
                user: process.env.NODEMAILER_USERNAME!.toString(),
                pass: process.env.NODEMAILER_PASSWORD!.toString()
            }
        })

        const mailOptions = {
            host: process.env.HOST_EMAIL,
            to: email,
            subject: type === emailType.verify ? "Verify your e-mail" : "Reset your password",
            html: `
                <h1><b>${type === emailType.verify ? "Verify your email" : "Reset your password"}</b></h1><br>
                <p>Click <a href="${type === emailType.verify ? process.env.VERIFY_EMAIL_URI + "=" + hashToken : process.env.RESET_PASSWORD_URI + "=" + hashToken}">here</a> to ${type === emailType.verify ? "verify your e-mail" : "reset your password"}
                or copy and paste this link into your browser.<br>
                ${type === emailType.verify ? process.env.VERIFY_EMAIL_URI + "=" + hashToken : process.env.RESET_PASSWORD_URI + "=" + hashToken}</p>
            `
        }

        await transporter.sendMail(mailOptions);
    } catch (error: any) {
        throw new Error(error);
    }
}