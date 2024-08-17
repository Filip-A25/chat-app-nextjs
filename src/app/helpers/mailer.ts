import {User} from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

interface Props {
    email: string;
    userId: string;
}

export const sendMail = async ({email, userId}: Props) => {
    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10);

            await User.updateUserWithId({id: userId, data: {
                verify_token: hashToken,
                verify_token_expiry: Date.now() + 3600000
            }})

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
            subject: "Verify your e-mail",
            html: `
                <h1><b>Verify your email</b></h1><br>
                <p>Click <a href="${process.env.VERIFY_EMAIL_URI + "=" + hashToken}">here</a> to verify your e-mail
                or copy and paste this link into your browser.<br>
                ${process.env.VERIFY_EMAIL_URI + "=" + hashToken}</p>
            `
        }

        await transporter.sendMail(mailOptions);
    } catch (error: any) {
        throw new Error(error);
    }
}