import { NextRequest, NextResponse } from "next/server"
import {authenticateDb, sequelize} from "@/database";
import { User } from "@/models";

export const POST = async (req: NextRequest) => {
    try {
        await authenticateDb(sequelize);

        const reqBody = await req.json();
        const {userId, username} = reqBody;

        if (!userId || !username) return NextResponse.json({message: "Insufficent data sent.", status: 400});
        const user = await User.findUserWithId(userId);

        if (!user) return NextResponse.json({message: "User could not be found.", status: 404});
        const savedUser = await user.update({username: username}, {where: {
            id: userId
        }});

        return NextResponse.json({message: "Username successfully updated.", stauts: 201, savedUser});
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500})
    }
}