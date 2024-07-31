import { NextResponse, NextRequest } from "next/server"
import jwt from "jsonwebtoken";

export const GET = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token");
        if (!token) return NextResponse.json({message: "Token could not be found.", stauts: 404});

        const tokenData: any = jwt.verify(token.value, process.env.JWT_SECRET_TOKEN!);

        return NextResponse.json({stauts: 200, tokenData});
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}