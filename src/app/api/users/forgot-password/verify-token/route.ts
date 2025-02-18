import User from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";



connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token)
        const user = await User.findOne({ forgotPasswordToken: token,forgotPasswordTokenExpry:{$gt:Date.now()}})

        console.log(user)


        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 })
        }



        return NextResponse.json({
            message: "Token verified",
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}