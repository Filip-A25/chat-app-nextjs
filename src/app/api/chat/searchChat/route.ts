import { NextResponse, NextRequest } from "next/server";
import { authenticateDb, sequelize } from "@/database";
import { Chat } from "@/models";

export const GET = async (req: NextRequest) => {
    try {
        await authenticateDb(sequelize);

        const messengerId = req.nextUrl.searchParams.get("messengerId");
        if (!messengerId) return NextResponse.json({message: "Messenger id not found.", status: 401});

        const chatId = await Chat.findChat(messengerId);
        if (!chatId) return NextResponse.json({message: "No chat found.", status: 404, chatId: false});

        return NextResponse.json({message: "Chat already exists.", status: 200, chatId});
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}