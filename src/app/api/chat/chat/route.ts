import { NextRequest, NextResponse } from "next/server"
import { sequelize, authenticateDb } from "@/database";
import { Chat } from "@/models";

export const POST = async (req: NextRequest) => {
    try {
        await authenticateDb(sequelize);

        const reqBody = await req.json();
        const {userId, messengerId} = reqBody;

        const response = await Chat.createChat({userId, messengerId});
        const chatId = response.dataValues.id;

        return NextResponse.json({message: "A new chat has been created.", status: 201, chatId});
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}