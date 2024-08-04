import { NextRequest, NextResponse } from "next/server";
import {User} from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateDb, sequelize } from "@/database";

export const POST = async (req: NextRequest) => {
    try {
        await authenticateDb(sequelize);

        const reqBody = await req.json();
        const {email, password} = reqBody;

        if (!email || !password) return NextResponse.json({message: "Incomplete data sent.", status: 400});

        const user = await User.findUserWithEmail(email);

        if (!user) return NextResponse.json({message: "User could not be found.", stauts: 404});

        const isPasswordCorrect = bcryptjs.compare(password, user.dataValues.password);

        if (!isPasswordCorrect) return NextResponse.json({message: "Incorrect password entered.", status: 401});

        const tokenData = {
            id: user.dataValues.id,
            email: user.dataValues.email,
            username: user.dataValues.username
        }
        const jwtToken = await jwt.sign(tokenData, process.env.JWT_SECRET_TOKEN!, {expiresIn: "3h"});

        const response = NextResponse.json({message: "User successfully logged in.", status: 201, user});
        response.cookies.set("token", jwtToken, {httpOnly: true});
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}