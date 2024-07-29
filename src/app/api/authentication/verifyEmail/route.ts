import { NextRequest, NextResponse } from "next/server";
import {User} from "@/models/userModel";
import { Op } from "sequelize";

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();
        const {token} = reqBody;

        const user = await User.findOne({where: {verify_token: token, verify_token_expiry: {[Op.gt]: Date.now()}}});

        if (!user) return NextResponse.json({message: "User could not be found.", status: 404});

        const savedUser = await user.update({verify_token: null, verify_token_expiry: null, verified: true});

        return NextResponse.json({message: "Email successfully verified.", status: 200, savedUser});
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}