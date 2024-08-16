import { NextResponse, NextRequest } from "next/server"
import { authenticateDb, sequelize } from "@/database";
import { sendMail } from "@/app/helpers";

export const POST = async (req: NextRequest) => {
    try {
        await authenticateDb(sequelize);

        const reqBody = await req.json();
        const {email, userId, type} = reqBody;

        await sendMail({email, userId, type});
        return NextResponse.json({message: "E-mail for password reset has been sent.", status: 201});
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}