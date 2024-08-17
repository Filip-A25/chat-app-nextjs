import { NextResponse, NextRequest } from "next/server"
import { authenticateDb, sequelize } from "@/database";
import { User } from "@/models";
import bcryptjs from "bcryptjs";

export const POST = async (req: NextRequest) => {
    try {
        await authenticateDb(sequelize);

        const reqBody = await req.json();
        const {userId, currentPassword, newPassword} = reqBody;

        const user = await User.findUserWithId(userId);
        if (!user) return NextResponse.json({message: "User could not be found.", status: 404});

        const isPasswordCorrect = await bcryptjs.compare(currentPassword, user.dataValues.password);
        if (!isPasswordCorrect) return NextResponse.json({message: "Wrong password entered.", status: 401});

        const salt = await bcryptjs.genSalt(10);
        const passwordHash = await bcryptjs.hash(newPassword, salt);

        await user.update({password: passwordHash}, {where: {
            id: userId
        }});

        return NextResponse.json({message: "Password has been successfully reset.", status: 201});
    } catch (error: any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}