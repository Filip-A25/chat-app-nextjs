import { NextRequest, NextResponse } from "next/server";
import { sequelize, authenticateDb } from "@/database";
import {User} from "@/models";

export const GET = async (req: NextRequest) => {
    try {
        await authenticateDb(sequelize);

        const username = req.nextUrl.searchParams.get("username");
        console.log(username);
        const trimmedUsername = username?.replace(/\s/g, "") || "";

        const user = await User.findOne({where: {username: trimmedUsername}});

        if (!user) return NextResponse.json({message: `User named ${trimmedUsername} could not be found.`, status: 404});

        return NextResponse.json({status: 200, user: {userId: user.dataValues.id, username: user.dataValues.username}});
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}