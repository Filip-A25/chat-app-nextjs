import { NextRequest, NextResponse } from "next/server";
import { ChatMessage } from "@/models";
import { sequelize, authenticateDb } from "@/database";

export const POST = async (req: NextRequest) => {
    try {
        await authenticateDb(sequelize);

        const reqData = await req.json();

        const response = await ChatMessage.createChatMessage(reqData);

        return NextResponse.json({message: "Message sent.", status: 201, response});
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}