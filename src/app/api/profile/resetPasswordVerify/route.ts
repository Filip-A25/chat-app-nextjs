import { NextResponse, NextRequest } from "next/server"
import { authenticateDb, sequelize } from "@/database";
import { Op } from "sequelize";
import { User } from "@/models";

export const POST = async (req: NextRequest) => {
    try {
        await authenticateDb(sequelize);

        const reqBody = await req.json();
        const {token} = reqBody;

        const user = await User.findOne({where: {forget_password_token: token, forget_password_token_expiry: {[Op.gt]: Date.now()}}});
        if (!user) return NextResponse.json({message: "User could not be found.", status: 404});

        const savedUser = await user.update({forget_password_token: null, forget_password_token_expiry: null});
        return NextResponse.json({message: "Password reset.", status: 201, savedUser});
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}