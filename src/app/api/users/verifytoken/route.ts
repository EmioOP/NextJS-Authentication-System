import User from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";



connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token)
        const user = await User.findOne({ verifyToken: token})

        if (user.verifyTokenExpiry > Date.now()) {
            return NextResponse.json({ error: "verify token expired" }, { status: 400 })
        }
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 })
        }

        console.log(user)

        user.isVerified = true;
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "Email verified",
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}