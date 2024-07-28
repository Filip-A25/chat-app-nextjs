import { NextResponse, NextRequest } from "next/server";
import {User, sequelize} from "@/models/userModel";
import { authenticateDb } from "@/database/config";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/app/helpers/mailer";
import { emailType } from "@/app/types/mailType";

export const POST = async (req: NextRequest) => {
    try {
        await authenticateDb(sequelize);

        const reqBody = await req.json();
        const {username, email, password} = reqBody;

        if (!username || !email || !password) return NextResponse.json({message: "Incomplete data.", status: 400});

        const user = await User.findUserWithEmail(email);

        if (user) return NextResponse.json({message: "User with the same e-mail address already exists.", status: 400});

        const salt = await bcryptjs.genSalt(10);
        const passwordHash = await bcryptjs.hash(password, salt);

        const newUser = await User.create({username, email, password: passwordHash});
    
        await sendMail({email, userId: newUser.dataValues.id, type: emailType.verify})
        return NextResponse.json({message: "User successfully registered.", status: 201, newUser});
    } catch (error: any) { 
        console.log(error);
        return NextResponse.json({error: error.message, status: 500});
    }
}