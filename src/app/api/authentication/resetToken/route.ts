import { NextRequest, NextResponse } from "next/server";
import { authenticateDb, sequelize } from "@/database";
import { User } from "@/models";
import jwt from "jsonwebtoken";

export const GET = async (req: NextRequest) => {
    try {
        await authenticateDb(sequelize);

        const userId = req.nextUrl.searchParams.get("userId");
        if (!userId) return NextResponse.json({message: "User ID could not be found.", status: 400});

        const user = await User.findUserWithId(userId);
        if (!user) return NextResponse.json({message: `User with ID ${userId} could not be found.`, status: 404});

        const tokenData = {
            userId: user.dataValues.id,
            username: user.dataValues.username,
            email: user.dataValues.email
        }

        const jwtToken = jwt.sign(tokenData, process.env.JWT_SECRET_TOKEN!, {expiresIn: "3h"});

        const response = NextResponse.json({message: "Token successfully reset.", status: 200});
        response.cookies.set("token", jwtToken, {httpOnly: true});
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}